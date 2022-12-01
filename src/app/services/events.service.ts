import { Injectable } from '@angular/core';
import {IEvent} from "../pages/events/events.component";
import {Observable} from "rxjs";
import {User} from "../pages/users/users.component";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  currentEvent!: IEvent | null;

  constructor(private http: HttpClient) { }


}
