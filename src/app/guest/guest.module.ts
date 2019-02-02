import {isDevMode, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestRoutingModule } from './guest-routing.module';
import { ShareModule } from './share/share.module';
import { GuestComponent } from './guest.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [GuestComponent, SignInComponent, SignUpComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    GuestRoutingModule,
    ShareModule
  ]
})
export class GuestModule { }
