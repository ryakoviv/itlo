import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { AccountComponent } from './account/account.component';
import {UserRoutingModule} from './user-routing.module';
import {ShareModule} from './share/share.module';
import { SearchComponent } from './search/search.component';
import { LostComponent } from './lost/lost.component';
import { FoundComponent } from './found/found.component';
import {MaterialModule} from '../shared/material/material.module';

@NgModule({
  declarations: [UserComponent, AccountComponent, SearchComponent, LostComponent, FoundComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ShareModule,
    MaterialModule
  ]
})
export class UserModule { }
