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
import {DownloadInstructionsComponent} from './download-instructions/download-instructions.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {AdminUserListComponent} from './admin-user-list/admin-user-list.component';
import {AdminPermissionsComponent} from './admin-permissions/admin-permissions.component';
import {AdminUserTableComponent} from './admin-user-table/admin-user-table.component';
import {AboutComponent} from "./about/about.component";
import {DragondropDocumentationComponent} from "./dragondrop-documentation/dragondrop-documentation.component";

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
  component: AdminPanelComponent,
  children: [{
    path: 'releases',
    component: ReleaseListComponent
  }, {
    path: 'users',
    component: AdminUserTableComponent
  }, {
    path: 'permissions',
    component: AdminPermissionsComponent
  }]
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
  path: 'instructions',
  component: DownloadInstructionsComponent
},{
  path: 'documentation',
  component: DragondropDocumentationComponent
}, {
  path: 'about',
  component: AboutComponent
}, {
  path: '**',
  component: PageNotFoundComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
