import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {RetainScrollPolyfillModule} from './shared/retain-scroll-polyfill/retain-scroll-polyfill.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RetainScrollPolyfillModule.forRoot({
      // Tell the polyfill how long to poll the document after a route change in
      // order to look for elements that need to be restored to a previous offset.
      pollDuration: 3000,
      pollCadence: 50
    }),
  ],
  providers: [ CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
