import { Injectable } from '@angular/core';
import {IEvent} from "../pages/events/events.component";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  currentEvent!: IEvent | null;

  constructor() { }
}
