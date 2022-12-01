import { Component } from '@angular/core';
import {environment} from "../environments/environment";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Завод з виробництва вареників';

  isAuthed: boolean;

  constructor(private authServce: AuthService) {
    console.log('DEBUG env prod - ', environment.production);

    this.isAuthed = this.authServce.isAuthed();
  }
}
