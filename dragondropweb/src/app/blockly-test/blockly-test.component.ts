import {Component, OnInit} from '@angular/core';

declare var Blockly: any;
declare var GoldenLayout: any;

@Component({
  selector: 'app-blockly-test',
  templateUrl: './blockly-test.component.html',
  styleUrls: ['./blockly-test.component.css']
})
export class BlocklyTestComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    const config = {
      content: [{
        type: 'row',
        content: [{
          type: 'component',
          componentName: 'testComponent',
          componentState: {label: 'A'}
        }, {
          type: 'column',
          content: [{
            type: 'component',
            componentName: 'testComponent',
            componentState: {label: 'B'}
          }, {
            type: 'component',
            componentName: 'testComponent',
            componentState: {label: 'C'}
          }]
        }]
      }]
    };

    const layout = new GoldenLayout(config);
    layout.registerComponent( 'testComponent', function( container, componentState ){
      container.getElement().html( '<h2>' + componentState.label + '</h2>' );
    });

    layout.init();
    // Blockly.inject('blocklyDiv', {
    //   sounds: true,
    //   comments: true,
    //   disable: true,
    //   collapse: true,
    //   grid: {
    //     spacing: 25,
    //     length: 3,
    //     colour: '#ccc',
    //     snap: true
    //   },
    //   maxBlocks: Infinity,
    //   media: 'assets/blockly/src/media/',
    //   readOnly: false,
    //   rtl: false,
    //   scrollbars: true,
    //   zoom: {
    //     controls: true,
    //     wheel: true,
    //     startScale: 1.0,
    //     maxScale: 4,
    //     minScale: .25,
    //     scaleSpeed: 1.1
    //   }
    // });
  }
}
