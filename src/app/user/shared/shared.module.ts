import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule} from '../../shared/material/material.module';
import {RouterModule} from '@angular/router';
import { ThingComponent } from './thing/thing.component';
import { ContentHeaderComponent } from './content-header/content-header.component';

@NgModule({
  declarations: [LayoutComponent, ThingComponent, ContentHeaderComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [MaterialModule, LayoutComponent, ThingComponent, ContentHeaderComponent]
})
export class SharedModule { }
