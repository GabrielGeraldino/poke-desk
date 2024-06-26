import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {
  IgxInputGroupModule,
  IgxButtonModule,
  IgxIconModule,
  IgxCardModule,
  IgxRippleModule,
  IgxDropDownModule,
  IgxToggleModule,
  IgxTreeModule,
  IgxChipsModule,
  IgxToastModule,
  IgxSelectModule,
} from 'igniteui-angular';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IgxChipsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    IgxInputGroupModule,
    IgxButtonModule,
    IgxIconModule,
    IgxCardModule,
    IgxRippleModule,
    IgxDropDownModule,
    IgxToggleModule,
    IgxTreeModule,
    IgxChipsModule,
    ReactiveFormsModule,
    IgxToastModule,
    IgxSelectModule,
    IonicModule.forRoot(),
    TranslateModule,
  ],
  exports: [
    CommonModule,
    IgxChipsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    IgxInputGroupModule,
    IgxButtonModule,
    IgxIconModule,
    IgxCardModule,
    IgxRippleModule,
    IgxDropDownModule,
    IgxToggleModule,
    IgxTreeModule,
    IgxChipsModule,
    ReactiveFormsModule,
    IgxToastModule,
    IgxSelectModule,
    IonicModule,
    TranslateModule,
  ],
})
export class SharedModule {}
