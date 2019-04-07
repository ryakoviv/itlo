import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from './material/material.module';
import {GooglePlacesDirective} from './google-places/google-places.directive';
import {AgmCoreModule} from '@agm/core';
const googleModule = AgmCoreModule.forRoot();

@NgModule({
  declarations: [GooglePlacesDirective],
  imports: [
    CommonModule,
    MaterialModule,
    googleModule,
  ],
  exports: [MaterialModule, GooglePlacesDirective, googleModule.ngModule]
})
export class SharedModule { }
