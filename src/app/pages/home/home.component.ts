import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/models/cliente';
import Swal from 'sweetalert2'; 
import { HomeService } from './home.service';
 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public form: FormGroup = new FormGroup({});

  public data = new MatTableDataSource<Cliente>();

  originaldata:any = [];

  displayedColumns: string[] = ['tipo', 'documento', 'nombre', 'eliminar'];


  constructor(private homeService:HomeService) { }

  ngOnInit(): void {
  
    this.getAllClientes()
    // let data = localStorage.getItem('clientes');
    // console.log(data)
    
    // if(data != null){
    //   this.originaldata = JSON.parse(data);
    //   this.data = new MatTableDataSource<Cliente>(this.originaldata);

    // }
    this.form = new FormGroup({
      tipo: new FormControl('', [Validators.required]),
      documento: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]\d{6,10}$/), Validators.minLength(5), Validators.maxLength(12)]),
      nombre: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]),
      
    });
  }

  getAllClientes(){
    this.homeService.getAllClientes().subscribe(res=>{
      console.log("esta es la respuesta del servidor");
      console.log(res)
      this.data = new MatTableDataSource<Cliente>(res);
      this.originaldata = res
    })
  }

  saveCliente(){
    if(this.form.valid){
      let encontrarPorDocumento = this.originaldata.filter((e:any)=>e.documento == this.form.value.documento);
      if(encontrarPorDocumento.length > 0){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Cliente ya existente!',
        })
        return;
      }
      // this.originaldata.push(this.form.value);
      // localStorage.setItem('clientes', JSON.stringify(this.originaldata));
      // this.data = new MatTableDataSource<Cliente>(this.originaldata);
      this.homeService.saveCliente(this.form.value).subscribe((res:any)=>{
        Swal.fire({
          icon: 'success',
          title: 'Acción realizada',
          text: 'Fue guardado correctamente',
        })
        this.getAllClientes();
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

  eliminar(value:any){

    let body = {id:value}
    this.homeService.deleteCliente(body).subscribe((res:any)=>{
      
    Swal.fire({
      icon: 'success',
      title: 'Acción realizada',
      text: 'Fue eliminado correctamente',
    })
    this.getAllClientes();

    })


  }

  
}
