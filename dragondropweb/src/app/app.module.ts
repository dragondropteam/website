/*
 * Copyright (c) 2018. DigiPen Institute of Technology
 */

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {ReleaseListComponent} from './release-list/release-list.component';
import {ReleaseComponent} from './release/release.component';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatMenuModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTableModule, MatToolbarModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {ReleaseService} from './release.service';
import {NewReleaseDialogComponent} from './new-release-dialog/new-release-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxEditorModule} from 'ngx-editor';
import {QuillModule} from 'ngx-quill';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {QuilljsComponent} from './quilljs/quilljs.component';
import {EditorModule} from 'primeng/editor';
import {FileUploadModule, SplitButtonModule} from 'primeng/primeng';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {EditReleaseDialogComponent} from './edit-release-dialog/edit-release-dialog.component';
import { DownloadLatestComponent } from './download-latest/download-latest.component';
import { DownloadVersionListComponent } from './download-version-list/download-version-list.component';
import { VersionListComponent } from './version-list/version-list.component';
import {AuthService} from './auth/auth.service';
import { CallbackComponent } from './callback/callback.component';
import {AuthGuard} from './auth/auth.guard';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './login/login.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { BlocklyTestComponent } from './blockly-test/blockly-test.component';
import { ProjectWorkspaceComponent } from './project-workspace/project-workspace.component';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReleaseListComponent,
    ReleaseComponent,
    NewReleaseDialogComponent,
    QuilljsComponent,
    PageNotFoundComponent,
    EditReleaseDialogComponent,
    DownloadLatestComponent,
    DownloadVersionListComponent,
    VersionListComponent,
    CallbackComponent,
    LoginComponent,
    ConfirmDeleteComponent,
    BlocklyTestComponent,
    ProjectWorkspaceComponent
  ],
  entryComponents: [
    NewReleaseDialogComponent,
    EditReleaseDialogComponent,
    ConfirmDeleteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3000', 'localhost:4200', 'digipen.edu'],
        skipWhenExpired: true
      }
    }),
    AppRoutingModule,
    MatChipsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxEditorModule,
    QuillModule,
    EditorModule,
    SplitButtonModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ReleaseService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
