import {Component, OnInit} from '@angular/core';
import {ReleaseService} from '../release.service';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-release-list',
  templateUrl: './release-list.component.html',
  styleUrls: ['./release-list.component.css']
})
export class ReleaseListComponent implements OnInit {
  displayedColumns = ['version', 'channel', 'changenotes', 'platforms'];
  dataSource = new ReleaseDataSource(this.releaseService);

  constructor(private releaseService: ReleaseService) {
  }

  ngOnInit() {

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
