/*
 * Copyright (c) 2018. DigiPen Institute of Technology
 */

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
    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']                                         // remove formatting button
    ];

    this.quill = new Quill(this.editorElement, {
      modules: {
        toolbar: toolbarOptions
      },
      theme: 'snow'
    });
  }
}
