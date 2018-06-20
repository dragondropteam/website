/*
 * Copyright (c) 2018. DigiPen Institute of Technology
 */

import {Component, OnInit} from '@angular/core';
import {ReleaseService} from '../release.service';
import {Release} from '../release/release.model';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  release: Release;

  constructor(private releaseService: ReleaseService, private authService: AuthService) {
  }

  ngOnInit() {
    this.getLatestRelease();
  }

  getLatestRelease() {
    this.releaseService.getLatestRelease()
      .subscribe(release => this.release = release);
  }

  getWindowsDownload() {
    return this.releaseService.getWindowsDownload(this.release);
  }

  getMacDownload() {
    return this.releaseService.getMacDownload(this.release);
  }

  getLinuxDownload() {
    return this.releaseService.getLinuxDownload(this.release);
  }

  isPlatformAvailable(platform) {
    return true;
    // let exists = false;
    // this.release.files.forEach(file => {
    //   if (file.platform === platform) {
    //     exists = true;
    //   }
    // });
    // return exists;
  }

  isReady() {
    return !!this.release;
  }

  login() {
    // this.authService.login();
  }
}
