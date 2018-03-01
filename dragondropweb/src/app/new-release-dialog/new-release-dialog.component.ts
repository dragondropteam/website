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

  constructor() {
  }

  ngOnInit() {
  }
}
