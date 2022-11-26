import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Degree, User} from "../users.component";

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  title: string = '';

  degrees: Array<Degree> = [Degree.HIGHER, Degree.MIDDLE, Degree.PRELIMINARY]

  licenseTypes = ['A', 'B', 'C', 'D'];

  userForm: FormGroup = new FormGroup({
    inn: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    middleName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    education: new FormControl('', Validators.required),
    experience: new FormControl('', Validators.required),
    driversLicence: new FormControl('', Validators.required)
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: { creation: boolean, user: User }, public dialogRef: MatDialogRef<UserDialogComponent>) {
  }

  ngOnInit(): void {
    if (this.data.creation) {
      this.title = "Занести нового працівника"
    } else {
      this.title = "Змінити дані працівника"
      this.userForm.controls['inn'].disable();
      this.userForm.setValue(this.data.user);
      this.userForm.controls['driversLicence'].setValue(this.data.user.driversLicence.split(','))
    }
  }

  submit() {
    this.dialogRef.close(this.userForm.value);
  }
}
