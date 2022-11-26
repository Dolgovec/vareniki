import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import {RouterModule} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    UsersComponent,
    UserDialogComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterModule.forChild([{path: '', component: UsersComponent, pathMatch: 'full'}])
  ]
})
export class UsersModule { }
