import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user.component';
import {AccountComponent} from './account/account.component';
import {SearchComponent} from './search/search.component';
import {LostComponent} from './lost/lost.component';
import {FoundComponent} from './found/found.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'account',
    pathMatch: 'full'
  },
  {
    path: 'account',
    component: UserComponent,
    children: [
      { path: '', component: AccountComponent }
    ]
  },
  {
    path: 'search',
    component: UserComponent,
    children: [
      { path: '', component: SearchComponent }
    ]
  },
  {
    path: 'lost',
    component: UserComponent,
    children: [
      { path: '', component: LostComponent }
    ]
  },
  {
    path: 'found',
    component: UserComponent,
    children: [
      { path: '', component: FoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
