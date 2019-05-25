import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserComponent } from './user.component';
import { AccountComponent } from './account/account.component';
import {UserRoutingModule} from './user-routing.module';
import {SharedModule} from './shared/shared.module';
import { LostComponent } from './lost/lost.component';
import { FoundComponent } from './found/found.component';
import { CreateEditThingComponent } from './create-edit-thing/create-edit-thing.component';
import { SearchThingComponent } from './search-thing/search-thing.component';
import { ThingDetailsComponent } from './thing-details/thing-details.component';

@NgModule({
  declarations: [
    UserComponent,
    AccountComponent,
    LostComponent,
    FoundComponent,
    CreateEditThingComponent,
    SearchThingComponent,
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
