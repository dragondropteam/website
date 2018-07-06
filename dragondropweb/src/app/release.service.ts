/*
 * Copyright (c) 2018. DigiPen Institute of Technology
 */

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Release, ReleaseFile} from './release/release.model';

@Injectable()
export class ReleaseService {
  private releaseURL = '/api/release';

  constructor(private httpClient: HttpClient) {
  }

  deleteRelease(id) : Observable<Release> {
    return this.httpClient.delete<Release>(`${this.releaseURL}/${id}`);
  }

  getReleases(): Observable<any> {
    return this.httpClient.get(this.releaseURL);
  }

  getRelease(id: String) {
    return this.httpClient.get<Release>(`${this.releaseURL}/${id}`);
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
    return this.httpClient.get(`${this.releaseURL}/${release._id}/files/${file._id}`);
  }

  getFileDownload(release: Release, file: ReleaseFile): String {
    return `/download/release/${release._id}/${file._id}`;
  }

  getDownload(file: String) {
    return `/download/file/${file}`;
  }

  getLatestRelease() {
    return this.httpClient.get<Release>(`${this.releaseURL}/latest`);
  }

  updateRelease(release: Release) {
    return this.httpClient.put<Release>(this.releaseURL, release);
  }

  getFiles(release: Release) {
    return this.httpClient.get<File[]>(`${this.releaseURL}/version/${release.version}/files`);
  }

  getWindowsDownload(release: Release) {
    return this.getDownload(`Dragon Drop Setup ${release.version}.exe`);
  }

  getMacDownload(release: Release) {
    return this.getDownload(`Dragon Drop-${release.version}.dmg`);
  }

  getLinuxDownload(release: Release) {
    return this.getDownload(`DragonDrop-${release.version}-x86_64.AppImage`);
  }
}
