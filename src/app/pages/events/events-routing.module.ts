import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventsComponent} from "./events.component";
import {EventPageComponent} from "./event-page/event-page.component";

const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
    pathMatch: 'full',
  },
  {
    path: 'events/:id',
    component: EventPageComponent
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
