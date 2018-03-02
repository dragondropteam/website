/*
 * Copyright (c) 2018. DigiPen Institute of Technology
 */

import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {NgModule} from '@angular/core';
import {ReleaseComponent} from './release/release.component';
import {ReleaseListComponent} from './release-list/release-list.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {DownloadLatestComponent} from './download-latest/download-latest.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'releases/:channel',
  component: ReleaseComponent
}, {
  path: 'admin',
  component: ReleaseListComponent
}, {
  path: 'release',
  component: DownloadLatestComponent
}, {
  path: '**',
  component: PageNotFoundComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
