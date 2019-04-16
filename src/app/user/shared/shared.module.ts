import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import {RouterModule} from '@angular/router';
import { ThingComponent } from './thing/thing.component';
import { ContentHeaderComponent } from './content-header/content-header.component';
import {SharedModule as AppSharedModule} from '../../shared/shared.module';
import { ImageHolderComponent } from './image-holder/image-holder.component';

@NgModule({
  declarations: [LayoutComponent, ThingComponent, ContentHeaderComponent, ImageHolderComponent],
  imports: [
    CommonModule,
    RouterModule,
    AppSharedModule
  ],
  exports: [LayoutComponent, ThingComponent, ContentHeaderComponent, AppSharedModule, ImageHolderComponent]
})
export class SharedModule { }
