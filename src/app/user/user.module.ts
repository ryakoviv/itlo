import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { AccountComponent } from './account/account.component';
import {UserRoutingModule} from './user-routing.module';

@NgModule({
  declarations: [UserComponent, AccountComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
