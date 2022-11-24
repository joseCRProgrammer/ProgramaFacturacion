import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from 'src/app/models/producto';

import Swal from 'sweetalert2'; 
import { ProductosService } from './productos.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  public form: FormGroup = new FormGroup({});

  public data = new MatTableDataSource<Producto>();

  originaldata:any = [];

  displayedColumns: string[] = ['descripcion', 'valor', 'eliminar'];


  constructor(
    private productosService: ProductosService
  ) { }

  ngOnInit(): void {
    this.getAllProductos()
    // let data = localStorage.getItem('productos');
    // console.log(data)
    
    // if(data != null){
    //   this.originaldata = JSON.parse(data);
    //   this.data = new MatTableDataSource<Producto>(this.originaldata);

    // }
    this.form = new FormGroup({
      valor: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]\d{1,10}$/), Validators.minLength(1)]),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]),
      
    });
  }


  getAllProductos(){
    this.productosService.getAllProductos().subscribe(res=>{
      console.log("esta es la respuesta del servidor");
      console.log(res)
      this.data = new MatTableDataSource<Producto>(res);
      this.originaldata = res
    })
  }

  saveCliente(){
    if(this.form.valid){
      let encontrarDescripcion = this.originaldata.filter((e:any)=>e.descripcion == this.form.value.descripcion);
      if(encontrarDescripcion.length > 0){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Producto ya existente!',
        })
        return;
      }
      // this.originaldata.push(this.form.value);
      // localStorage.setItem('productos', JSON.stringify(this.originaldata));
      // this.data = new MatTableDataSource<Producto>(this.originaldata);
      this.productosService.saveProductos(this.form.value).subscribe((res:any)=>{
        Swal.fire({
          icon: 'success',
          title: 'Acción realizada',
          text: 'Fue guardado correctamente',
        })
        this.getAllProductos();
      })
      
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Los datos del formulario deben estar correctos!',
      })
    }
  }

    formatMoney(num:any) {
      // Create our number formatter.
      var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      });

      return formatter.format(num);
    }

  eliminar(value:any){
    // let index =  this.originaldata.findIndex((e:any)=>e.descripcion == value);
    // this.originaldata.splice(index, 1);
    // this.data = new MatTableDataSource<Producto>(this.originaldata);
    // localStorage.setItem('productos', JSON.stringify(this.originaldata));

    let body = {id:value}
    this.productosService.deleteProductos(body).subscribe((res:any)=>{
      
    Swal.fire({
      icon: 'success',
      title: 'Acción realizada',
      text: 'Fue eliminado correctamente',
    })
    this.getAllProductos();

    })

  }
}
