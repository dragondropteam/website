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
  MatDialogModule, MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule, MatStepperModule,
  MatTableModule, MatTabsModule, MatToolbarModule, MatSidenavModule, MatListModule, MatPaginatorModule, MatSortModule, MatCheckboxModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {ReleaseService} from './release.service';
import {NewReleaseDialogComponent} from './new-release-dialog/new-release-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxEditorModule} from 'ngx-editor';
import {QuillModule} from 'ngx-quill';
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
import { DownloadInstructionsComponent } from './download-instructions/download-instructions.component';
import { DirectionsDialogComponent } from './directions-dialog/directions-dialog.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AdminPermissionsComponent } from './admin-permissions/admin-permissions.component';
import { AdminUserTableComponent } from './admin-user-table/admin-user-table.component';
import {UserService} from './user.service';
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';
import { AboutComponent } from './about/about.component';


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
    DownloadInstructionsComponent,
    DirectionsDialogComponent,
    AdminPanelComponent,
    AdminUserListComponent,
    AdminPermissionsComponent,
    AdminUserTableComponent,
    CreateUserDialogComponent,
    AboutComponent
  ],
  entryComponents: [
    NewReleaseDialogComponent,
    EditReleaseDialogComponent,
    ConfirmDeleteComponent,
    DirectionsDialogComponent,
    CreateUserDialogComponent
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
    MatSnackBarModule,
    MatStepperModule,
    MatTabsModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxEditorModule,
    QuillModule,
    EditorModule,
    SplitButtonModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [ReleaseService, UserService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
