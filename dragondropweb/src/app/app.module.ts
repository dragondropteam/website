import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {ReleaseListComponent} from './release-list/release-list.component';
import {ReleaseComponent} from './release/release.component';
import {
  MatButtonModule, MatCardModule, MatChipsModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule,
  MatTableModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {ReleaseService} from './release.service';
import {NewReleaseDialogComponent} from './new-release-dialog/new-release-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
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
    DownloadVersionListComponent
  ],
  entryComponents: [
    NewReleaseDialogComponent,
    EditReleaseDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    BrowserAnimationsModule,
    FormsModule,
    NgxEditorModule,
    QuillModule,
    EditorModule,
    SplitButtonModule,
    FileUploadModule
  ],
  providers: [ReleaseService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
