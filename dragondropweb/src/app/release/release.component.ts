import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ReleaseService} from '../release.service';

const validBranches = ['stable', 'beta', 'alpha'];

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.css']
})
export class ReleaseComponent implements OnInit {
  error = false;
  errorMsg: String;

  constructor(private route: ActivatedRoute,
              private releaseService: ReleaseService) {
  }

  ngOnInit() {
    this.errorMsg = '';
    const branch = this.route.snapshot.paramMap.get('channel');
    if (!validBranches.includes(branch)) {
      this.error = true;
      this.errorMsg += 'Invalid Release Channel';
    }

    // const files = this.releaseService
    //   .getLatestReleaseFilesForPlatform('windows');

    const files = [];
    if (files.length === 0) {
      this.error = true;
      this.errorMsg += 'No files available for';
    }
    console.log(branch);
  }

}
