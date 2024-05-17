import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from '../pipes/pipes.module';
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

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IgxChipsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    PipesModule,
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
  ],
  exports: [
    CommonModule,
    IgxChipsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    PipesModule,
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
  ],
})
export class SharedModule {}
