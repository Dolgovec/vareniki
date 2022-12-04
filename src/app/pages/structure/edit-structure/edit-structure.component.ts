import {Component, Inject, OnInit} from '@angular/core';
import {Degree, User} from "../../users/users.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-structure',
  templateUrl: './edit-structure.component.html',
  styleUrls: ['./edit-structure.component.scss']
})
export class EditStructureComponent implements OnInit {
  title: string = '';

  degrees: Array<Degree> = [Degree.HIGHER, Degree.MIDDLE, Degree.PRELIMINARY]

  licenseTypes = ['A', 'B', 'C', 'D'];
  unitTypes: Array<UnitType> = [UnitType.DEPARTMENT, UnitType.POSITION];
  emptyNode = '(відсутній)';
  parentNodes: Array<string> = [];

  unitForm: FormGroup = new FormGroup({
    parentNode: new FormControl(''),
    unitType: new FormControl('', Validators.required)
  });

  departmentForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  positionForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    education: new FormControl('', Validators.required),
    experience: new FormControl('', Validators.required),
    driversLicence: new FormControl('', Validators.required)
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: editStructureDialogConfig, public dialogRef: MatDialogRef<EditStructureComponent>) {
  }

  ngOnInit(): void {

    this.parentNodes = [this.emptyNode, ...this.data.nodesFullTitles]
    /*if (this.data.creation) {
      this.title = "Занести нового працівника"
    } else {
      this.title = "Змінити дані працівника"
      this.userForm.controls['inn'].disable();
      this.userForm.setValue(this.data.user);
      this.userForm.controls['driversLicence'].setValue(this.data.user.driversLicence.split(','))
    }*/
  }

  submit() {
    this.dialogRef.close();
  }

}

export enum UnitType {
  DEPARTMENT = 'відділ',
  POSITION = 'посада'
}

export interface editStructureDialogConfig {
  nodesFullTitles: Array<string>,
  selectedNode?: string,
  selectedUnitType?: string
}
