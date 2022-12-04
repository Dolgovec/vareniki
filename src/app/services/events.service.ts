import { Injectable } from '@angular/core';
import {IEvent} from "../pages/events/events.component";
import {Observable} from "rxjs";
import {Director, User} from "../pages/users/users.component";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {SharedService} from "./shared.service";

export interface WorkOrder {
  id?: number;
  title: string;
  description: string;
  initiator?: User;
  participants?: Director[];
  performers?: User[];
  fromDate?: Date;
  toDate?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  currentEvent!: IEvent | null;

  constructor(private http: HttpClient,
              private sharedService: SharedService) { }

  getOrders(): Observable<WorkOrder[]> {
    return this.http.get<WorkOrder[]>(this.sharedService.getFullUrl('order'));
  }

  getOrderById(id: string): Observable<WorkOrder> {
    return this.http.get<WorkOrder>(this.sharedService.getFullUrl(`order/${id}`));
  }

  createOrder(order: WorkOrder): Observable<any> {
    return this.http.post<any>(this.sharedService.getFullUrl('order'), order);
  }

  saveOrder(order: WorkOrder): Observable<any> {
    return this.http.patch<any>(this.sharedService.getFullUrl('order'), order);
  }

  signOrder(orderId: string, userId: string): Observable<any> {
    return this.http.post(this.sharedService.getFullUrl(`order/${orderId}`), {employeeInn: userId});
  }
}
