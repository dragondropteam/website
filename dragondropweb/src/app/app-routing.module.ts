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
import {VersionListComponent} from './version-list/version-list.component';
import {CallbackComponent} from './callback/callback.component';
import {AuthGuard} from './auth/auth.guard';
import {LoginComponent} from './login/login.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'home',
  redirectTo: ''
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'release/:id',
  component: ReleaseComponent
}, {
  path: 'admin',
  canActivate: [AuthGuard],
  component: ReleaseListComponent
}, {
  path: 'release',
  component: DownloadLatestComponent
}, {
  path: 'versions',
  component: VersionListComponent
}, {
  path: 'callback',
  component: CallbackComponent
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
