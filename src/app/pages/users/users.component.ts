import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {UserDialogComponent} from "./user-dialog/user-dialog.component";
import {filter, take} from "rxjs";
import {UsersService} from "../../services/users.service";

export interface User {
  inn: string;
  firstName: string;
  middleName: string;
  lastName: string;
  education: string;
  experience: number;
  driversLicence: string;
}

export interface Director {
  signed: boolean;
  employee: User;
}

enum Gender {
  MALE = "чоловіча",
  FEMALE = "жіноча"
}

export enum Degree {
  MIDDLE = "Середня",
  HIGHER = "Вища",
  PRELIMINARY = "Початкова"
}


// *** HARDCODED data
/*const SAMPLE_DATA: User[] = [
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
];*/

// *******


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['number', 'inn', 'firstName', 'lastName', 'middleName', 'education', 'experience', 'driversLicence', 'edit', 'remove'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  constructor(private dialog: MatDialog,
              private userService: UsersService) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.dataSource.data = users;
      }, error: (err) => {
        console.log('error!', err);
      }
    });
  }

  removeUser(user: User) {
    const index = this.dataSource.data.indexOf(user);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription(); // Refresh the datasource
  }

  openUserCreationDialog() {
    const dialogRef = this.dialog.open(UserDialogComponent, {width: '450px', data: {creation: true}});

    dialogRef.afterClosed().pipe(take(1), filter((val) => !!val)).subscribe(result => {
      // this.userService.createUser(result).subscribe(console.log);
      this.dataSource.data.push(result);
      this.dataSource.data = [...this.dataSource.data]
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
      this.dataSource.data = [...this.dataSource.data]
    });
  }

  onFileSelected(event: Event): void {
    // @ts-ignore
    const file: File = (event.target as HTMLInputElement)?.files[0];


      const formData = new FormData();

      formData.append("files", file, file.name);

      this.userService.uploadUsers(formData).subscribe({
        next: (resp) => {
          if (resp) {
           this.userService.getUsers().subscribe((users: Array<User>) => {
              this.dataSource.data = users;
            });
          }
        },
        error: (error) => {
          console.log('error!', error);
        }
      });

  }
}
