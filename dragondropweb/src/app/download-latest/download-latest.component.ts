/*
 * Copyright (c) 2018. DigiPen Institute of Technology
 */

import {Component, OnInit} from '@angular/core';
import {ReleaseService} from '../release.service';
import {Release} from '../release/release.model';
import {DirectionsDialogComponent} from '../directions-dialog/directions-dialog.component';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-download-latest',
  templateUrl: './download-latest.component.html',
  styleUrls: ['./download-latest.component.css']
})
export class DownloadLatestComponent implements OnInit {

  release: Release;

  constructor(private releaseService: ReleaseService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getLatestRelease();
  }

  getLatestRelease() {
    this.releaseService.getLatestRelease()
      .subscribe(release => this.release = release);
  }

  isPlatformAvailable(platform) {
    return true;
  }

  directionsDialogPopup(platform) {
    this.dialog.open(DirectionsDialogComponent, {
      data: platform
    });
  }
}
