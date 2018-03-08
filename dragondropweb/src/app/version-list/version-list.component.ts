import { Component, OnInit } from '@angular/core';
import {EditReleaseDialogComponent} from '../edit-release-dialog/edit-release-dialog.component';
import {Observable} from 'rxjs/Observable';
import {MatDialog} from '@angular/material';
import {ReleaseService} from '../release.service';
import {DataSource} from '@angular/cdk/collections';


export class ReleaseDataSource extends DataSource<any> {
  connect(): Observable<any[]> {
    return this.releaseService.getReleases();
  }

  disconnect(): void {
  }

  constructor(private releaseService: ReleaseService) {
    super();
  }
}

@Component({
  selector: 'app-version-list',
  templateUrl: './version-list.component.html',
  styleUrls: ['./version-list.component.css']
})
export class VersionListComponent implements OnInit {
  displayedColumns = ['version', 'channel', 'changenotes', 'platforms', 'more'];
  dataSource = new ReleaseDataSource(this.releaseService);

  constructor(private releaseService: ReleaseService, private dialog: MatDialog) {
  }

  ngOnInit() {

  }

  isPlatformAvailable(release, platform) {
    let exists = false;
    release.files.forEach(file => {
      if (file.platform === platform) {
        exists = true;
      }
    });
    return exists;
  }
}
