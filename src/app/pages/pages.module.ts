import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'



//Modulos
import { SharedModule } from '../shared/shared.module';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';


import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './productos/productos.component';
import { FacturaComponent } from './factura/factura.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { ReportesComponent } from './reportes/reportes.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { LoginComponent } from './login/login.component';




@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    ProductosComponent,
    FacturaComponent,
    ReportesComponent,
    LoginComponent
  ],

  exports: [
    HomeComponent,
    PagesComponent,
    FormsModule,
    ReactiveFormsModule,
  ],

  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class PagesModule { }
