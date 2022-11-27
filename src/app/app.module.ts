import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HomeModule} from "./pages/home/home.module";
import {EventsModule} from "./pages/events/events.module";
import {Route, RouterModule} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";

const routes: Route[] = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./pages/events/events.module').then(m => m.EventsModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'structure',
    loadChildren: () => import('./pages/structure/structure.module').then(m => m.StructureModule)
  }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HomeModule,
    HttpClientModule,
    EventsModule,
    RouterModule.forRoot(routes),
    MatMenuModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
