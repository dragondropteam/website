import { Component, OnInit } from '@angular/core';

declare var Blockly: any;

@Component({
  selector: 'app-blockly-test',
  templateUrl: './blockly-test.component.html',
  styleUrls: ['./blockly-test.component.css']
})
export class BlocklyTestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    Blockly.inject('blocklyDiv', {
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
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 4,
        minScale: .25,
        scaleSpeed: 1.1
      }
    });
  }
}
