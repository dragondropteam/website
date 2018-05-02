/*
 * Copyright (c) 2018. DigiPen Institute of Technology
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ReleaseService} from '../release.service';
import {Release} from './release.model';

const validBranches = ['stable', 'beta', 'alpha'];

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.css']
})
export class ReleaseComponent implements OnInit {
  error = false;
  errorMsg: String;
  release?: Release = null;

  constructor(private route: ActivatedRoute,
              private releaseService: ReleaseService) {
  }

  ngOnInit() {
    this.errorMsg = '';
    const id = this.route.snapshot.paramMap.get('id');
    console.log('id', id);

    this.releaseService.getRelease(id).subscribe(release => {
      this.release = release;
    });
  }
}
