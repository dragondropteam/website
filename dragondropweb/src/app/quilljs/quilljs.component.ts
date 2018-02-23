import {Component, Input, OnInit} from '@angular/core';

import * as QuillNamespace from 'quill';
const Quill: any = QuillNamespace;

@Component({
  selector: 'app-quilljs',
  templateUrl: './quilljs.component.html',
  styleUrls: ['./quilljs.component.css']
})
export class QuilljsComponent implements OnInit {

  @Input() editorElement: string;
  private quill: any;

  constructor() {
  }

  ngOnInit() {
    this.quill = new Quill(this.editorElement, {
      modules: {toolbar: true},
      theme: 'snow'
    });
  }
}
