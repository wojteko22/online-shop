import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ShopsComponent } from './shops/shops.component';
import { AppRoutingModule } from './app-rounting.module';


@NgModule({
  declarations: [
    AppComponent,
    ShopsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
