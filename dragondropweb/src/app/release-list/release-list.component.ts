import {Component, OnInit} from '@angular/core';
import {ReleaseService} from '../release.service';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {MatDialog} from '@angular/material';
import {NewReleaseDialogComponent} from '../new-release-dialog/new-release-dialog.component';

@Component({
  selector: 'app-release-list',
  templateUrl: './release-list.component.html',
  styleUrls: ['./release-list.component.css']
})
export class ReleaseListComponent implements OnInit {
  displayedColumns = ['version', 'channel', 'changenotes', 'platforms'];
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
