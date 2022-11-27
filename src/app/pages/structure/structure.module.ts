import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StructureComponent} from './structure.component';
import {RouterModule} from "@angular/router";
import {MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [
    StructureComponent
  ],
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    RouterModule.forChild([{path: '', component: StructureComponent, pathMatch: 'full'}])
  ]
})
export class StructureModule {}
