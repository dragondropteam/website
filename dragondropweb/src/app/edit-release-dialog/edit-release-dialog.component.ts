/*
 * Copyright (c) 2018. DigiPen Institute of Technology
 */

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {ReleaseService} from '../release.service';
import {ReleaseFile} from '../release/release.model';

@Component({
  selector: 'app-edit-release-dialog',
  templateUrl: './edit-release-dialog.component.html',
  styleUrls: ['./edit-release-dialog.component.css']
})
export class EditReleaseDialogComponent implements OnInit {
  channels = ['Stable', 'Release Candidate', 'Alpha', 'Beta'];
  platforms = ['windows', 'macos', 'linux'];

  file?: File = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private releaseService: ReleaseService) {
  }

  ngOnInit() {
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  upload() {
    if (this.file !== null) {
      this.releaseService.addFileToRelease(this.data.release, this.file).subscribe();
    }
  }

  download(file) {
    console.log(file);
    this.releaseService.downloadFile(this.data.release, file).subscribe();
  }

  getFileDownload(file: ReleaseFile){
    return this.releaseService.getFileDownload(this.data.release, file);
  }
}

