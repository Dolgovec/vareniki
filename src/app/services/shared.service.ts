import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  getApiPath(): string {
    return environment.production ? environment.backendUrl : '/';
  }

  getFullUrl(url: string): string {
    return this.getApiPath() + url;
  }
}
