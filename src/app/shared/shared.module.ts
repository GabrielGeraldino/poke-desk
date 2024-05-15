import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
} from 'igniteui-angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
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
  ],
  exports: [
    CommonModule,
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
  ],
})
export class SharedModule {}
