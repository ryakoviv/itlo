import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {GuestComponent} from './guest.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: GuestComponent,
    children: [
      { path: '', component: SignInComponent }
    ]
  },
  {
    path: 'sign-up',
    component: GuestComponent,
    children: [
      { path: '', component: SignUpComponent }
    ]
  },
  {
    path: 'forgot',
    component: GuestComponent,
    children: [
      { path: '', component: ForgotPasswordComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule {
}
