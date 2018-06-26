import {Component, TIMEOUT, TYPE_COMPONENT} from './component';
import {Workspace} from '../workspace';
import {Subject} from 'rxjs';
const EDITOR_ID = 'editor';

declare var ace: any;

export class CodeComponent extends Component {
  private codeContainer: any;
  private editorOptions: any;
  private readonly subscriber: boolean;
  private readonly codeObservable_: Subject<any>;
  private editor: any;
  private readonly codeSubscriber: { next: (code) => void };

  static get ID() {
    return 'codeComponent';
  }

  static get TITLE() {
    return 'Code';
  }

  static registerComponent(workspace: Workspace) {
    workspace.layout.registerComponent(CodeComponent.ID, CodeComponent);
    // ipc.on('show_code', workspace.addComponentIfMissing.bind(workspace, CodeComponent.ID, CodeComponent.TITLE))
  }

  static generateContent(editorConfig = {}, subscriber = true) {
    return {
      type: TYPE_COMPONENT,
      title: CodeComponent.TITLE,
      componentName: CodeComponent.ID,
      componentState: {
        label: CodeComponent.ID,
        editorOptions: editorConfig,
        subscriber: subscriber
      }
    };
  }

  constructor(container, componentState) {
    super(componentState);

    this.codeContainer = container;
    this.codeContainer.getElement().html('<div id="editor"></div>');

    this.editorOptions = componentState.editorOptions || {};
    this.subscriber = componentState.subscriber;
    this.codeObservable_ = new Subject();

    this.codeContainer.on('open', () => {
      this.setupDOM();
    });

    this.codeContainer.on('resize', () => {
      if (!this.editor) {
        return;
      }

      this.editor.resize();
    });

    this.codeContainer.on('destroy', () => {
      this.codeContainer = null;
      this.editor = null;
    });

    this.codeSubscriber = {
      next: code => {
        if (code.code) {
          this.setCode(code.code);
        }
      }
    };

  }

  setupDOM() {
    console.log('SetupDOM');

    console.log(document.getElementById(EDITOR_ID));

    if (!document.getElementById(EDITOR_ID)) {
      setTimeout(() => {
        this.setupDOM();
      }, TIMEOUT);
      return false;
    }

    document.getElementById(EDITOR_ID).style.fontSize = '12px';
    this.editor = ace.edit(EDITOR_ID);

    this.editor.$blockScrolling = Infinity;

    this.editor.getSession().setMode(this.editorOptions.editorLanguage);
    this.editor.setReadOnly(this.editorOptions.readOnly);

    // let theme = electronConfig.get('theme');
    // if (theme) {
    //   theme = theme.toLowerCase().replace(' ', '_');
    //   this.editor.setTheme(`ace/theme/${theme}`);
    // }

    this.editor.on('change', () => {
      this.codeObservable_.next({code: this.getCode()});
    });

    return true;
  }

  setCode(code) {
    if (!this.editor) {
      setTimeout(this.setCode.bind(this), 500, code);
      return;
    }

    this.editor.setValue(code, -1);
  }

  getCode() {
    return this.editor.getValue();
  }


  updateSettings() {
    // let theme = electronConfig.get('theme');
    // if (theme && this.editor) {
    //   theme = theme.toLowerCase().replace(' ', '_');
    //   this.editor.setTheme(`ace/theme/${theme}`);
    // }
    //
    // document.getElementById(EDITOR_ID).style.fontSize = `${electronConfig.get('fontsize') || '12'}px`;
  }

  projectLoad(projectFactory) {
    const project = projectFactory();
    this.setCode(project.code.code);
  }

  /**
   * @override
   * @param workspace
   * @return {*}
   */
  onAttach(workspace) {
    super.onAttach(workspace);

    if (this.subscriber) {
      workspace.registerCodeSubscriber(this.codeSubscriber);
    } else {
      workspace.registerProjectSubscriber(this.projectLoad.bind(this));
      workspace.registerCodeObservable(this.codeObservable_);
    }

    // ipcRenderer.on('settings_updated', this.updateSettings.bind(this));
  }
}
