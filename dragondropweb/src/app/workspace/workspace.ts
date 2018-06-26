import {Observable, ReplaySubject, Subject} from 'rxjs';
import {Component, TIMEOUT, TYPE_COMPONENT} from './components/component';
import {registerDefaultComponents} from './components/default_components';

declare var GoldenLayout: any;

export class Workspace {
  private readonly layoutConfig: any;
  private codeSubject: ReplaySubject<any>;
  private projectSubject: ReplaySubject<any>;
  private reloadObservable: Subject<any>;
  private code: any;
  private readonly components: any;
  private readonly componentRegister: (Workspace) => void;
  layout: any;

  constructor(layoutConfig: any, dataSource: any, componentRegister: (Workspace) => void = registerDefaultComponents) {
    this.layoutConfig = layoutConfig;

    this.codeSubject = new ReplaySubject<any>(1);
    this.projectSubject = new ReplaySubject<any>(1);
    this.reloadObservable = new Subject<any>();

    this.components = {};

    // this.dataSource = dataSource;
    this.componentRegister = componentRegister;
  }

  registerComponents() {
    this.componentRegister(this);
  }

  getComponent(componentName) {
    return this.components[componentName];
  }

  registerCodeObservable(codeObservable: Observable<any>) {
    codeObservable
      .debounceTime(TIMEOUT)
      .subscribe({
        next: code => {
          this.code = code;
          this.codeSubject.next(code);
        },
        error: err => {
          console.error(err);
        }
      });
  }

  registerProjectSubscriber(subscriber) {
    this.projectSubject.subscribe(subscriber);
  }

  registerCodeSubscriber(subscriber) {
    this.codeSubject.subscribe(subscriber);
  }

  registerReloadSubscriber(subscriber) {
    this.reloadObservable.subscribe(subscriber);
  }

  loadProject(loadedProject) {
    // loadedProject.projectManager = Object.assign(new BaseProjectManager(), loadedProject.projectManager);
    //
    // // Layout may not be initialized yet, so wait and see if it comes up
    // if (!this.layout.isInitialised) {
    //   setTimeout(this.loadProject.bind(this), TIMEOUT, loadedProject);
    //   return;
    // }
    //
    // document.title = `${loadedProject.getName()} - ${loadedProject.projectPath}`;
    //
    // this.loadProjectFile(loadedProject);
  }

  saveAndReload() {
    this.save();
    this.reload();
  }

  init() {
    // this.setIPCListeners();
    //
    this.layout = new GoldenLayout(this.layoutConfig);

    this.registerComponents();

    this.layout.on('componentCreated', this.componentCreated.bind(this));

    this.layout.init();

    // this.layout.on('initialised', () => ipcRenderer.send('render_ready'));
  }

  /**
   * Called when a component is created, will attach that component to this workspace allowing it to register any
   * Observables/Subscribers
   * @private
   * @param component
   */
  componentCreated (component) {
    component.instance.onAttach(this);
    component.on('itemDestroyed', () => component.instance.onDetach(this));
    this.components[component.componentName] = component.instance;
  }

  save () {
    if (!this.code) {
      return;
    }

    // this.dataSource.save(this.code);
  }

  saveAs (project) {
    if (!this.code) {
      return;
    }

    // this.dataSource.saveAs(this.code, project);
  }

  reload () {
    this.reloadObservable.next();
  }

  loadProjectFile (project) {
    // this.loadedProject = project;
    // this.code = this.dataSource.loadProjectFile(project);
    //
    // this.projectSubject.next(this.getProject.bind(this));
  }

  getLayoutRoot () {
    return this.layout.root.contentItems[0] || this.layout.root;
  }

  addChildToRoot (child) {
    return this.getLayoutRoot().addChild(child);
  }

  hasComponent (component) {
    return this.components.hasOwnProperty(component);
  }

  getProject () {
    // return {project: this.loadedProject, code: this.code};
  }

  /**
   * Add the given component to the workspace if it does not already exist
   * @param {!string} component The name of the component
   * @param {!string} title The title to display on the components tab
   */
  addComponentIfMissing (component, title) {
    // log.debug('Add Component if Missing', component, title);

    if (this.hasComponent(component)) {
      return;
    }

    const config = {
      type: TYPE_COMPONENT,
      componentName: component,
      componentState: {label: component},
      title: title,
    };

    // Object.assign(config.componentState, this.componentStates[component] || {});

    this.addChildToRoot(config);
  }

  /**
   * Removes the component from the workspace, this saves the components state to allow the user to reopen the
   * component later
   * @param {!BaseComponent} component The component to remove
   */
  removeComponent (component) {
    // console.log(component.componentState);
    // this.componentStates[component.getName()] = component.componentState;
    delete this.components[component.name];
  }
}
