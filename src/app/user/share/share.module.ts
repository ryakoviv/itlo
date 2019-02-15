import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule} from '../../shared/material/material.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [LayoutComponent]
})
export class ShareModule { }
