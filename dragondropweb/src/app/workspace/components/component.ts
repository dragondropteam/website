import {Workspace} from '../workspace';

export const TIMEOUT = 100;
export const TYPE_COMPONENT = 'component';

export class Component {
  private componentState: any;
  private readonly _name: string;
  protected parent: Workspace;

  constructor(componentState: any) {
    this.componentState = componentState;
    this._name = componentState.label;
  }

  get name(): string {
    return this._name;
  }

  onAttach(parent: Workspace) {
    this.parent = parent;
  }

  onDetach() {
    this.parent.removeComponent(this);
    this.parent = null;
  }
}
