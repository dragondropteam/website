import {Component, TIMEOUT, TYPE_COMPONENT} from './component';
import {Subject} from 'rxjs';

const PHASER_ID = 'phaser';

export class PhaserComponent extends Component {
  private webview: any;
  private source: any;

  static get ID() {
    return 'phaserComponent';
  }

  static get TITLE() {
    return 'Phaser';
  }

  static registerComponent(workspace) {
    workspace.layout.registerComponent(PhaserComponent.ID, PhaserComponent);
    // ipc.on('show_phaser', workspace.addComponentIfMissing.bind(workspace, PhaserComponent.ID, PhaserComponent.TITLE));
  }

  static generateContent() {
    return {
      type: 'component',
      componentName: PhaserComponent.ID,
      title: PhaserComponent.TITLE,
      componentState: {label: PhaserComponent.ID}
    };
  }

  constructor(container, componentState) {
    super(componentState);

    container.getElement().html('<iframe id="phaser" style="display:flex; width:99%; height:99%; margin:auto; border-style: solid; background: gray;"></iframe>');
    container.on('open', () => this.setupDOM());

    container.on('destroy', () => {
      this.webview = null;
    });
  }

  setupDOM() {
    if (!document.getElementById(PHASER_ID)) {
      setTimeout(this.setupDOM.bind(this), TIMEOUT);
      return;
    }

    this.webview = document.getElementById('phaser');

    this.webview.srcdoc = `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="UTF-8" />\n<script type="text/javascript" src="assets/phaser.min.js"></script>\n<style type="text/css">\n	body {\n		margin: 0;\n	}\n</style>\n</head>\n<body>\n<script type="text/javascript">\n\nlet elephant;\n\n\nvar game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});\n\nfunction preload() {\n  game.load.crossOrigin = 'anonymous'; \n game.load.image('elephant', 'http://localhost:9000/test-release/elephant.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIOSFODNN7EXAMPLE%2F20180719%2F%2Fs3%2Faws4_request&X-Amz-Date=20180719T203432Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=415f3eda9c2060a04681418ad1720fdf241f032d9d7301c3ce033f350bc55941');\n\n}\n\nfunction create() {\n  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;\n  this.scale.pageAlignHorizontally = true;\n  this.scale.pageAlignVertically = true;\n  this.scale.updateLayout( true );\n  elephant = game.add.sprite(0, 0, 'elephant');\n\n}\n\nfunction update() {\n\n}\n\n</script>\n</body>\n</html>`;
  }

  getSource() {
    return this.webview.src;
  }

  setSource(source) {
    // WebView may not be ready yet just wait a small ammount of time
    if (!this.webview) {
      setTimeout(this.setSource.bind(this), TIMEOUT, source);
      return;
    }

    this.webview.srcdoc = source;
    this.source = source;
  }

  reload() {
    this.setSource(this.source);
    // if (!this.webview.src || !this.webview.getWebContents()) {
    //   this.setSource(this.source);
    // } else {
    //   this.webview.reload();
    // }
  }

  projectLoad(projectFactory) {
    const project = projectFactory();
    this.setSource(`file://${project.project.getSourceFile('html')}`);
  }

  onAttach(workspace) {
    super.onAttach(workspace);

    // ipcRenderer.on('show_embedded', this.toggleDevTools.bind(this));
    // ipcRenderer.on('pause_execution', this.pauseExecution.bind(this));
    // ipcRenderer.on('step_execution', this.stepExecution.bind(this));
    // ipcRenderer.on('resume_execution', this.resumeExecution.bind(this));

    workspace.registerProjectSubscriber(this.projectLoad.bind(this));
    workspace.registerReloadSubscriber(this.reload.bind(this));
  }

  toggleDevTools() {
    if (!this.webview) {
      return;
    }

    this.webview.openDevTools();
  }

  pauseExecution() {
    if (!this.webview) {
      return;
    }

    this.webview.executeJavaScript('game.enableStep();');
  }

  stepExecution() {
    if (!this.webview) {
      return;
    }

    this.webview.executeJavaScript('game.step();');
  }

  resumeExecution() {
    if (!this.webview) {
      return;
    }

    this.webview.executeJavaScript('game.disableStep();');
  }
}
