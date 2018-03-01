import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Release, ReleaseFile} from './release/release.model';

@Injectable()
export class ReleaseService {
  private releaseURL = '/api/release';

  constructor(private httpClient: HttpClient) {
  }

  getReleases(): Observable<any> {
    return this.httpClient.get(this.releaseURL);
  }

  getRelease(id: String) {
    return this.httpClient.get(`${this.releaseURL}/${id}`);
  }

  createRelease(release: any): Observable<Release> {
    return this.httpClient.post<Release>(this.releaseURL, release);
  }

  addFileToRelease(release: Release, file: File | undefined) {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(`${this.releaseURL}/${release._id}/files`, formData);
  }

  downloadFile(release: Release, file: ReleaseFile) {
    console.log(`${this.releaseURL}/${release._id}/files/${file._id}`);
    return this.httpClient.get(`${this.releaseURL}/${release._id}/files/${file._id}`);
  }

  getFileDownload(release: Release, file: ReleaseFile): String {
    return `/download/release/${release._id}/${file._id}`;
  }
}
