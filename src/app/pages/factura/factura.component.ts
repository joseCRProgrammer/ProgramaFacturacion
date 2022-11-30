import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/models/cliente';
import { Producto } from 'src/app/models/producto';
import Swal from 'sweetalert2'; 
import { HomeService } from '../home/home.service';
import { ProductosService } from '../productos/productos.service';
import { FacturaService } from './factura.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent implements OnInit {

  constructor(private homeService: HomeService,
    private productosService: ProductosService,
    private facturaService: FacturaService) { }

  public form: FormGroup = new FormGroup({});
  public clientes:Cliente[] = [];
  public productos:Producto[] = [];
  public productoSeleccionado:any = [];
  public facturasGuardadas:any = [];



  ngOnInit(): void {
    this.facturasGuardadas = localStorage.getItem('facturasGuardadas');
    this.form = new FormGroup({
      cliente: new FormControl('', [Validators.required]),
    });

    this.homeService.getAllClientes().subscribe(res=>{
      this.clientes = res
    })
    this.productosService.getAllProductos().subscribe(res=>{
      this.productos = res
    });
  

  }
  selectProducto(event:any){

    let filter:any = this.productos.filter((e:any) => e.descripcion == event.value)
    let data = filter[0];
  
    let validate = this.productoSeleccionado.filter((e:any) => e.descripcion == event.value);
    if(validate.length > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'El producto fue previamente seleccionado',
      })
      return
    }
    
    this.productoSeleccionado.push(data)
  }

  changeCantidad(index:number,event:any){
    let data = this.productoSeleccionado
    if(event.target.value > 0){
      data[index].cantidad = event.target.value 
      data[index].total = event.target.value * this.productoSeleccionado[index].valor 

    }
    else{
      data[index].total = 0
      data[index].cantidad = 0

    }
   
    
  }

  deleteProductoSeleccionado(index: number){
    this.productoSeleccionado.splice(index,1)
  }

  formatMoney(num:any) {
    // Create our number formatter.
    var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    });
    if(num>0){
      return formatter.format(num);
    }
    else{
      return '$0'
    }
  }

  subTotal(){
    let total = 0
    this.productoSeleccionado.map((item:any)=>{
      if(item.total > 0){
        total = total + item.total
      }
    })
    return total
  }
  
  descuentos():any {
    let total = 0
    this.productoSeleccionado.map((item:any)=>{
      if(item.total > 0){
        total = total + item.total
      }
    })
    let descuento = 0
    if(total >= 60000 && total < 100000)
      descuento = total*0.1
    else if(total >= 100000)
      descuento = total*0.15
    return descuento;
  }

  aplicado10():any {
    let total = 0
    this.productoSeleccionado.map((item:any)=>{
      if(item.total > 0){
        total = total + item.total
      }
    })
    if(total >= 60000 && total < 100000)
      return true
    else
      return false 
  }

  aplicado15():any {
    let total = 0
    this.productoSeleccionado.map((item:any)=>{
      if(item.total > 0){
        total = total + item.total
      }
    })
    if(total >= 100000)
      return true
    else
      return false 
  }

  subtotalDescuentos(){
    return this.subTotal()-this.descuentos()
  }
  iva(){
    return this.subtotalDescuentos()*0.19
  }
  total(){
    return this.subtotalDescuentos()+this.iva()
  }

  saveFactura(){
    if(this.form.valid){
      let validate = this.productoSeleccionado.filter((e:any) => e.total > 0)

      if(validate.length == this.productoSeleccionado.length){
        let data = {
          total:this.total(),
          subtotaldescuento:this.subtotalDescuentos(),
          subtotal:this.subTotal(),
          descuentos:this.descuentos(),
          aplicado10:this.aplicado10(),
          aplicado15:this.aplicado15(),
          iva:this.iva(),
          productoseleccionado:this.productoSeleccionado,
          cliente:this.form.value.cliente,
          year: new Date().getFullYear(),
          month: new Date().getMonth()+1,
        }
        let facturas = [];

        this.facturaService.saveFactura(data).subscribe((res:any)=>{
          Swal.fire({
            icon: 'success',
            title: 'Acción realizada',
            text: 'Fue guardado correctamente',
          })
          this.productoSeleccionado = []
          this.form.reset();
        })
      
       
     

      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Todos los productos deben tener una cantidad mayor a 0',
        })
      }
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor llene los datos de manera correcta',
      })
    }
  }

}
