import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {NgModule} from '@angular/core';
import {ReleaseComponent} from './release/release.component';
import {ReleaseListComponent} from './release-list/release-list.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'releases/:channel',
  component: ReleaseComponent
}, {
  path: 'admin',
  component: ReleaseListComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
