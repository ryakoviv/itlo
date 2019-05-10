import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserComponent } from './user.component';
import { AccountComponent } from './account/account.component';
import {UserRoutingModule} from './user-routing.module';
import {SharedModule} from './shared/shared.module';
import { SearchLostComponent } from './search-lost/search-lost.component';
import { LostComponent } from './lost/lost.component';
import { FoundComponent } from './found/found.component';
import { CreateFoundComponent } from './create-found/create-found.component';
import { SearchFoundComponent } from './search-found/search-found.component';
import { ThingDetailsComponent } from './thing-details/thing-details.component';

@NgModule({
  declarations: [
    UserComponent,
    AccountComponent,
    SearchLostComponent,
    LostComponent,
    FoundComponent,
    CreateFoundComponent,
    SearchFoundComponent,
    ThingDetailsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
