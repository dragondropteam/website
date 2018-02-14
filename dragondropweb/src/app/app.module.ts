import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {ReleaseListComponent} from './release-list/release-list.component';
import {ReleaseComponent} from './release/release.component';
import {MatChipsModule, MatTableModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {ReleaseService} from './release.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReleaseListComponent,
    ReleaseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatChipsModule,
    MatTableModule
  ],
  providers: [ReleaseService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
