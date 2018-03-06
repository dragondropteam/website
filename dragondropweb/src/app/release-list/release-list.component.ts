/*
 * Copyright (c) 2018. DigiPen Institute of Technology
 */

import {Component, OnInit} from '@angular/core';
import {ReleaseService} from '../release.service';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {MatDialog} from '@angular/material';
import {NewReleaseDialogComponent} from '../new-release-dialog/new-release-dialog.component';
import * as QuillDeltaToHtmlConverter from 'quill-delta-to-html';
import {Release} from '../release/release.model';
import {EditReleaseDialogComponent} from '../edit-release-dialog/edit-release-dialog.component';

@Component({
  selector: 'app-release-list',
  templateUrl: './release-list.component.html',
  styleUrls: ['./release-list.component.css']
})
export class ReleaseListComponent implements OnInit {
  displayedColumns = ['version', 'channel', 'changenotes', 'platforms', 'edit'];
  dataSource = new ReleaseDataSource(this.releaseService);

  constructor(private releaseService: ReleaseService, private dialog: MatDialog) {
  }

  ngOnInit() {

  }

  createRelease() {
    const dialogRef = this.dialog.open(NewReleaseDialogComponent, {
      height: '89%',
      width: '70%',
      maxHeight: '600px',
      maxWidth: '800px'
    });

    dialogRef.afterClosed().subscribe(release => {
      if (release) {
        this.releaseService.createRelease(release)
          .subscribe(newRelease => console.log(newRelease));
      }
    });
  }

  editRelease(release: Release) {
    const dialogRef = this.dialog.open(EditReleaseDialogComponent, {
      data: {release: release},
      height: '78vh',
      width: '90%'
    });

    dialogRef.afterClosed().subscribe(editedRelease => {
      console.log('afterClosed edit');
      if (editedRelease) {
        this.releaseService.updateRelease(editedRelease).subscribe(result => console.log(result));
      }
    });
  }
}

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
