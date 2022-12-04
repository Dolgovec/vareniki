import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StructureComponent} from './structure.component';
import {RouterModule} from "@angular/router";
import {MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {MatDividerModule} from "@angular/material/divider";
import { EditStructureComponent } from './edit-structure/edit-structure.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    StructureComponent,
    EditStructureComponent
  ],
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatDividerModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTooltipModule,
    RouterModule.forChild([{path: '', component: StructureComponent, pathMatch: 'full'}])
  ]
})
export class StructureModule {}
