import {Component, TIMEOUT, TYPE_COMPONENT} from './component';
import {Subject} from 'rxjs';

const BLOCKLY_DIV_ID = 'blocklyDiv';
const BLOCKLY_AREA_ID = 'blocklyArea';
declare var Blockly: any;

export class BlocklyComponent extends Component {
  private readonly blocklyConfig: any;
  private readonly workspaceToCode: any;
  private readonly disableOrphans: boolean;
  private codeObservable_: Subject<any>;
  private blocklyContainer: any;
  private workspace: any;
  private blocklyArea: any;
  private blocklyDiv: any;

  static get ID() {
    return 'blocklyComponent';
  }

  static get TITLE() {
    return 'Blockly';
  }

  static registerComponent(workspace) {
    workspace.layout.registerComponent(BlocklyComponent.ID, BlocklyComponent);
  }

  static generateContent(blocklyConfig, workspaceToCode, disableOrphans: boolean = false) {
    return {
      type: TYPE_COMPONENT,
      title: BlocklyComponent.TITLE,
      componentName: BlocklyComponent.ID,
      componentState: {
        label: BlocklyComponent.ID,
        blocklyConfig: blocklyConfig,
        workspaceToCode: workspaceToCode,
        disableOrphans: disableOrphans
      }
    };
  }

  static getDefaultBlocklyConfig(toolboxSource, readOnly: boolean = false) {
    return {
      sounds: true,
      comments: true,
      disable: true,
      collapse: true,
      grid: {
        spacing: 25,
        length: 3,
        colour: '#ccc',
        snap: true
      },
      maxBlocks: Infinity,
      media: 'assets/blockly/src/media/',
      readOnly: false,
      rtl: false,
      scrollbars: true,
      toolbox: toolboxSource,
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 4,
        minScale: .25,
        scaleSpeed: 1.1
      }
    };
  }

  static generateWorkspaceMappingFunction(workspaceToCode) {
    return function (workspace) {
      const code = workspaceToCode(workspace);
      const dom = Blockly.Xml.workspaceToDom(workspace);
      const xml = Blockly.Xml.domToText(dom);
      return {code: code, xml: xml};
    };
  }

   constructor(container, componentState) {
    super(componentState);

    this.blocklyConfig = componentState.blocklyConfig;
    this.workspaceToCode = componentState.workspaceToCode;
    this.disableOrphans = componentState.disableOrphans;
    this.codeObservable_ = new Subject();

    this.blocklyContainer = container;
    this.blocklyContainer.getElement().html('<div id="blocklyArea"><div id="blocklyDiv" style="position: absolute"></div></div>');

    this.blocklyContainer.on('open', () => {
      this.setupDOM();
    });

    this.blocklyContainer.on('resize', () => {
      console.log('resize');
      if (!this.workspace) {
        return;
      }
      this.resize();
    });

    this.blocklyContainer.on('destroy', () => {
      this.blocklyContainer = null;
      this.blocklyArea = null;
    });
  }

  resize() {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    let element = this.blocklyArea;

    if (!element) {
      setTimeout(this.resize.bind(this), TIMEOUT);
      return;
    }

    let x = 0;
    let y = 0;
    do {
      x += element.offsetLeft;
      y += element.offsetTop;
      element = element.offsetParent;
    } while (element);

    console.log(`x: ${x} y: ${y}`);

    // Position blocklyDiv over blocklyArea.
    this.blocklyDiv.style.left = `${x}px`;
    // this.blocklyDiv.style.top = `${y}px`;
    this.blocklyDiv.style.width = `${this.blocklyArea.offsetWidth}px`;
    this.blocklyDiv.style.height = `${this.blocklyArea.offsetHeight}px`;
    Blockly.svgResize(this.workspace);
  }

  setupDOM() {
    this.blocklyArea = document.getElementById(BLOCKLY_AREA_ID);
    if (!this.blocklyArea) {
      setTimeout(this.setupDOM.bind(this), TIMEOUT);
      return false;
    }

    this.blocklyArea = document.getElementById(BLOCKLY_AREA_ID);
    this.blocklyDiv = document.getElementById(BLOCKLY_DIV_ID);

    this.workspace = Blockly.inject(BLOCKLY_DIV_ID, this.blocklyConfig);

    /**
     * If we are in a language where orphans are not allowed disable them, this event listener must come before
     * the change listener
     */
    if (this.disableOrphans) {
      this.workspace.addChangeListener(Blockly.Events.disableOrphans);
    }

    this.workspace.addChangeListener(this.blocklyUpdate.bind(this));

    this.resize();

    return true;
  }

  getWorkspace() {
    return this.workspace;
  }

  get codeObservable() {
    return this.codeObservable_
      .map(this.workspaceToCode);
  }

  blocklyUpdate(event) {
    try {
      /**
       * All events in Blockly excluding Blockly.Events.UI are used for meaningful changes, Blockly.Events.UI
       * is for context menu, toolbox and the like opening no reason to spin off a disk operation
       */
      if (event.type !== Blockly.Events.UI) {
        const block = this.workspace.getBlockById(event.blockId);
        if (block && block.onchange) {
          block.onchange(event);
        }

        this.codeObservable_.next(this.workspace);
      }
    } catch (err) {
      this.codeObservable_.error(err);
    }
  }

  projectLoad(projectFactory) {

    if (!this.workspace) {
      setTimeout(this.projectLoad.bind(this), 500, projectFactory);
      return;
    }

    const project = projectFactory();

    if (!project.code.xml) {
      return;
    }

    try {
      const xml = Blockly.Xml.textToDom(project.code.xml);

      // We are loading the starting blocks for the application they should not be part of the undo stack
      Blockly.Events.recordUndo = false;
      Blockly.Xml.domToWorkspace(xml, this.workspace);
      Blockly.Events.recordUndo = true;
    } catch (err) {
      // ipcRenderer.send('project-load-error', {message: err.message, stack: err.stack});
    }
  }

  /**
   *
   * @param workspace
   */
  onAttach(workspace) {
    super.onAttach(workspace);

    workspace.registerCodeObservable(this.codeObservable);
    workspace.registerProjectSubscriber(this.projectLoad.bind(this));
  }
}