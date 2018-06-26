import {Workspace} from '../workspace';
import {BlocklyComponent} from './blockly.component';
import {CodeComponent} from './code.component';

export function registerDefaultComponents(workspace: Workspace) {
  BlocklyComponent.registerComponent(workspace);
  CodeComponent.registerComponent(workspace);
}

