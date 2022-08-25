import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectorySelectComponent } from './directory-select/directory-select.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatTreeModule} from "@angular/material/tree";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {FlexModule} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    DirectorySelectComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatTreeModule,
    MatCheckboxModule,
    MatButtonModule,
    FlexModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class CommonComponentsModule { }
