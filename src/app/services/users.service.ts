import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {User} from "../pages/users/users.component";
import {environment} from "../../environments/environment";
import {SharedService} from "./shared.service";
import {userServiceMockData} from "./user-service-mock-data";

export interface Supervisor {
  id: number;
  employee: User;
  title?: string;
  signed?: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient,
              private sharedService: SharedService) { }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.sharedService.getFullUrl('employee'));
  }

  getSupervisors(): Observable<Supervisor[]> {
    return this.http.get<Supervisor[]>(this.sharedService.getFullUrl('order/supervizors'));
  }

  getUserByInn(id: string): Observable<User> {
    return this.http.get<User>(this.sharedService.getFullUrl(`employee/${id}`));
  }

  uploadUsers(file: FormData): Observable<any> {
    return this.http.post(this.sharedService.getFullUrl('import/employees'), file, {headers: {enctype: "multipart/form-data"}});
  }

  createUser(user: User): Observable<User> {
    // endpoint not working at the moment
    return this.http.post<User>(this.sharedService.getFullUrl('employee'), user);
  }

  getDepartment(): Observable<any> {
    // return this.http.get(this.sharedService.getFullUrl('department/root'));
    return of(userServiceMockData);
  }



}
