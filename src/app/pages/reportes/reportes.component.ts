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
  public facturas10: number = 0;
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
    let filter = this.facturasGuardadas.filter((e:any) => e.month == mes[1] && e.year == mes[0])
    console.log(filter);
    
    this.totalFacturas = 0;
    this.totalVentas = 0;
    this.totalIva = 0;
    this.totalFacturas10 = 0
    this.facturas10 = 0;
    this.totalFacturas15 = 0;
    this.facturas15 = 0;

    this.totalFacturas = filter.length
  

    filter.map((item:any)=>{
      this.totalVentas = item.total + this.totalVentas
      this.totalIva = item.iva + this.totalIva
      if(item.aplicado10){
        this.facturas10 = this.facturas10+1
        this.totalFacturas10 = item.descuentos + this.totalFacturas10
      }
      if(item.aplicado15){
        this.facturas15 = this.facturas15+1
        this.totalFacturas15 = item.descuentos + this.totalFacturas15
      }

    })

  }

}
