import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';


import Swal from 'sweetalert2'; 
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  constructor() { }
  public form: FormGroup = new FormGroup({});
  public facturasGuardadas:any = [];

  public totalFacturas:number = 0;
  public totalVentas:number = 0;
  public totalIva:number = 0;
  public factuas10: number = 0;
  public totalFacturas10:number = 0;
  public facturas15: number = 0;
  public totalFacturas15:number = 0;


  ngOnInit(): void {
    if(localStorage.getItem('facturasGuardadas') != null  && localStorage.getItem('facturasGuardadas') != "") { 
      this.facturasGuardadas = JSON.parse(localStorage.getItem('facturasGuardadas') || '');
    }
    this.form = new FormGroup({
      month: new FormControl('', [Validators.required]),      
    });
  }

  buscar(){
    let mes = this.form.value.month.split("-");
    console.log(mes)

  }

}
