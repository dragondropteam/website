import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {NgModule} from '@angular/core';
import {ReleaseComponent} from './release/release.component';
import {ReleaseListComponent} from './release-list/release-list.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'releases/:branch',
  component: ReleaseComponent
}, {
  path: 'releases',
  component: ReleaseListComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
