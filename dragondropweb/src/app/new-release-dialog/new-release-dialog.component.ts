import {Component, OnInit} from '@angular/core';
import {Release} from '../release/release.model';
import * as QuillNamespace from 'quill';
import {MatDialogRef} from '@angular/material';

const Quill: any = QuillNamespace;

@Component({
  selector: 'app-new-release-dialog',
  templateUrl: './new-release-dialog.component.html',
  styleUrls: ['./new-release-dialog.component.css']
})
export class NewReleaseDialogComponent implements OnInit {
  channels = ['Stable', 'Release Candidate', 'Alpha', 'Beta'];
  release = new Release();
  private quill: any;

  constructor(public dialogRef: MatDialogRef<NewReleaseDialogComponent>) {
  }

  ngOnInit() {
    // const toolbarOptions = [
    //   ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    //
    //   [{'header': 1}, {'header': 2}],               // custom button values
    //   [{'list': 'ordered'}, {'list': 'bullet'}],
    //   [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
    //   [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
    //   [{'direction': 'rtl'}],                         // text direction
    //
    //   [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
    //   [{'header': [1, 2, 3, 4, 5, 6, false]}],
    //
    //   [{'color': []}, {'background': []}],          // dropdown with defaults from theme
    //   [{'font': []}],
    //   [{'align': []}],
    //
    //   ['clean']                                         // remove formatting button
    // ];
    //
    // this.quill = new Quill('.quill-container', {
    //   modules: {toolbar: toolbarOptions},
    //   theme: 'snow'
    // });
  }
}
