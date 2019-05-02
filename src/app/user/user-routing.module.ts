import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user.component';
import {AccountComponent} from './account/account.component';
import {SearchLostComponent} from './search-lost/search-lost.component';
import {SearchFoundComponent} from './search-found/search-found.component';
import {LostComponent} from './lost/lost.component';
import {FoundComponent} from './found/found.component';
import {CreateFoundComponent} from './create-found/create-found.component';


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
    path: 'search-lost',
    component: UserComponent,
    children: [
      { path: '', component: SearchLostComponent }
    ]
  },
  {
    path: 'search-found',
    component: UserComponent,
    children: [
      { path: '', component: SearchFoundComponent }
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
  },
  {
    path: 'found-create',
    component: UserComponent,
    children: [
      { path: '', component: CreateFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
