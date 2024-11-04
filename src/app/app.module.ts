import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';  
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { CommonModule } from '@angular/common';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    //AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MenuComponent,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }