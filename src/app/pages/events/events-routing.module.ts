import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventsComponent} from "./events.component";
import {EventPageComponent} from "./event-page/event-page.component";
import {GetOrderByIdResolver} from "../../resolvers/get-order-by-id.resolver";

const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
    pathMatch: 'full',
  },
  {
    path: 'events/:id',
    component: EventPageComponent,
    resolve: {
      order: GetOrderByIdResolver
    }
  },
  {
    path: 'events/new_event',
    component: EventPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
