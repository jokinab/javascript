import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { UtilsModule } from './utils/utils.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UtilsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
