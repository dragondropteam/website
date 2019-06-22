/*
 * Copyright (c) 2018. DigiPen Institute of Technology
 */

import {Component, OnInit} from '@angular/core';
import {Release} from '../release/release.model';
import * as QuillNamespace from 'quill';
import {MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import * as semver from 'semver';

function validateSemver(formControl: FormControl) {
  return semver.valid(formControl.value) !== null ? null : {
    validateSemver: {
      valid: false
    }
  };
}
const Quill: any = QuillNamespace;

@Component({
  selector: 'app-new-release-dialog',
  templateUrl: './new-release-dialog.component.html',
  styleUrls: ['./new-release-dialog.component.css']
})
export class NewReleaseDialogComponent implements OnInit {
  channels = ['Stable', 'Release Candidate', 'Alpha', 'Beta'];
  release = new Release();

  versionFormControl = new FormControl('', [
    Validators.required,
    validateSemver
  ]);


  constructor() {
  }

  ngOnInit() {
  }
}
