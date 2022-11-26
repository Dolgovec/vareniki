import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {UserDialogComponent} from "./user-dialog/user-dialog.component";
import {filter, take} from "rxjs";

export interface User {
  inn: string;
  firstName: string;
  middleName: string;
  lastName: string;
  degree: Degree;
  workExperience: number;
  driverLicense: string;
}

enum Gender {
  MALE = "чоловіча",
  FEMALE = "жіноча"
}

export enum Degree {
  MIDDLE = "середня",
  HIGHER = "вища",
  PRELIMINARY = "початкова"
}


// *** HARDCODED data
const SAMPLE_DATA: User[] = [
  {
    inn: "AE1111",
    firstName: "Юрій",
    lastName: "Петренко",
    middleName: "Петрович",
    degree: Degree.HIGHER,
    workExperience: 5,
    driverLicense: "B"
  },
  {
    inn: "AE1112",
    firstName: "Дмитро",
    lastName: "Сидоренко",
    middleName: "Володимирович",
    degree: Degree.HIGHER,
    workExperience: 5,
    driverLicense: "B"
  },
  {
    inn: "AE1113",
    firstName: "Володимир",
    lastName: "Іванчук",
    middleName: "Дмитрович",
    degree: Degree.PRELIMINARY,
    workExperience: 2,
    driverLicense: "B"
  }
];

// *******


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['number', 'inn', 'firstName', 'lastName', 'middleName', 'degree', 'workExperience', 'driverLicense', 'edit', 'remove'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>(SAMPLE_DATA);

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  removeUser(user: User) {
    const index = this.dataSource.data.indexOf(user);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription(); // Refresh the datasource
  }

  openUserCreationDialog() {
    const dialogRef = this.dialog.open(UserDialogComponent, {width: '450px', data: {creation: true}});

    dialogRef.afterClosed().pipe(take(1), filter((val) => !!val)).subscribe(result => {
      this.dataSource.data.push(result);
      this.dataSource._updateChangeSubscription();
      console.log(result);
    });
  }

  openUserEditDialog(user: User) {
    const index = this.dataSource.data.indexOf(user);
    const dialogRef = this.dialog.open(UserDialogComponent, {width: '450px', data: {creation: false, user}});

    dialogRef.afterClosed().pipe(take(1), filter((val) => !!val)).subscribe(result => {
      result.inn = this.dataSource.data[index].inn;
      console.log(result);
      this.dataSource.data[index] = result;
      this.dataSource._updateChangeSubscription();
    });
  }
}
