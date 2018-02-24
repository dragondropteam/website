import {Component, OnInit} from '@angular/core';
import {ReleaseService} from '../release.service';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {MatDialog} from '@angular/material';
import {NewReleaseDialogComponent} from '../new-release-dialog/new-release-dialog.component';
import * as QuillDeltaToHtmlConverter from 'quill-delta-to-html';

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

  getHTML(release) {
    try {
      const releaseJSON = JSON.parse(release.changeNotes);
      console.log(releaseJSON);
      const html = new QuillDeltaToHtmlConverter(releaseJSON.ops, {}).convert();
      console.log(`raw html ${html}`);
      return html;
    } catch (ex) {
      // console.error(ex);
      return release.changeNotes;
    }
  }

  createRelease() {
    const dialogRef = this.dialog.open(NewReleaseDialogComponent, {
      height: '89%',
      width: '70%',
      maxHeight: '600px',
      maxWidth: '800px'
    });

    dialogRef.afterClosed().subscribe(release => {
      this.releaseService.createRelease(release)
        .subscribe();
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
