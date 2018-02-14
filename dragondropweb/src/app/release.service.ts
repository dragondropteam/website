import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ReleaseService {
  private releaseURL = '/api/release';
  constructor(private httpClient: HttpClient) { }

  getReleases(): Observable<any> {
    return this.httpClient.get(this.releaseURL);
  }
}
