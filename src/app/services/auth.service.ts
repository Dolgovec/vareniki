import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {tap} from "rxjs";
import {SharedService} from "./shared.service";

export interface ITokenData {
  access_token: string;
  expires_in: number;
  "not-before-policy": number;
  "refresh_expires_in": number;
  refresh_token: string;
  scope: string;
  session_state: string;
  token_type: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private sharedService: SharedService) {
  }

  setAuthToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getAuthToken(): string {
    return localStorage.getItem('token') || '';
  }

  isAuthed(): boolean {
    return !!localStorage.getItem('token');
  }

  login(username: string, password: string) {
    const url = this.sharedService.getFullUrl('login');
    const body: URLSearchParams = new URLSearchParams({
      username,
      password,
      grant_type: 'password'
    });
    const headers: HttpHeaders = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<ITokenData>(url, body, {headers}).pipe(
      tap((tokenData: ITokenData) => {
        this.applyTokenData(tokenData);
      })
    );
  }

  private applyTokenData(tokenData: ITokenData) {
    this.setAuthToken(tokenData.access_token);
  }
}
