import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HomeModule} from "./pages/home/home.module";
import {EventsModule} from "./pages/events/events.module";
import {Route, RouterModule} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./interceptors/token.interceptor";
import {AuthService} from "./services/auth.service";
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {AuthorizedGuard} from "./guards/authorized.guard";
import {NotAuthorizedGuard} from "./guards/not-authorized.guard";

const routes: Route[] = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'events',
    loadChildren: () => import('./pages/events/events.module').then(m => m.EventsModule),
    canLoad: [AuthorizedGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
    canLoad: [AuthorizedGuard]
  },
  {
    path: 'structure',
    loadChildren: () => import('./pages/structure/structure.module').then(m => m.StructureModule),
    canLoad: [AuthorizedGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    canLoad: [NotAuthorizedGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
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
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
