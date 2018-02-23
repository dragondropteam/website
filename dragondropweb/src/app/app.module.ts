import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {ReleaseListComponent} from './release-list/release-list.component';
import {ReleaseComponent} from './release/release.component';
import {
  MatButtonModule, MatChipsModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule,
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
import { QuilljsComponent } from './quilljs/quilljs.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReleaseListComponent,
    ReleaseComponent,
    NewReleaseDialogComponent,
    QuilljsComponent
  ],
  entryComponents: [NewReleaseDialogComponent],
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
    BrowserAnimationsModule,
    FormsModule,
    NgxEditorModule,
    QuillModule
  ],
  providers: [ReleaseService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
