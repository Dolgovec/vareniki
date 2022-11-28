import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../pages/users/users.component";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.employeeUrl);
  }

  createUser(user: User): Observable<User> {
    // disfunctional at the moment
    return this.http.post<User>(environment.employeeUrl, user);
  }

  getDepartment(): Observable<any> {
    return this.http.get('https://waren.herokuapp.com/department/root');
  }

  uploadUsers(file: FormData): Observable<any> {
    return this.http.post('https://waren.herokuapp.com/import/employees', file, {headers: {enctype: "multipart/form-data"}})
  }
}
