import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {EventsService, WorkOrder} from "../services/events.service";

@Injectable({
  providedIn: 'root'
})
export class GetOrderByIdResolver implements Resolve<WorkOrder> {
  constructor(private eventsService: EventsService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WorkOrder> {
    return this.eventsService.getOrderById(route.paramMap?.get('id') || '');
  }
}
