import {Component, OnInit} from '@angular/core';

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
  MALE="чоловіча",
  FEMALE="жіноча"
}

enum Degree {
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
  dataSource = SAMPLE_DATA;

  constructor() {
  }

  ngOnInit(): void {
  }

}
