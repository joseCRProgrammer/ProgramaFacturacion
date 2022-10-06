import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/models/cliente';
import Swal from 'sweetalert2'; 
 

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


  constructor() { }

  ngOnInit(): void {
    let data = localStorage.getItem('clientes');
    console.log(data)
    
    if(data != null){
      this.originaldata = JSON.parse(data);
      this.data = new MatTableDataSource<Cliente>(this.originaldata);

    }
    this.form = new FormGroup({
      tipo: new FormControl('', [Validators.required]),
      documento: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]\d{6,10}$/), Validators.minLength(5), Validators.maxLength(12)]),
      nombre: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]),
      
    });
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
      this.originaldata.push(this.form.value);
      localStorage.setItem('clientes', JSON.stringify(this.originaldata));
      this.data = new MatTableDataSource<Cliente>(this.originaldata);
      Swal.fire({
        icon: 'success',
        title: 'Acción realizada',
        text: 'Fue guardado correctamente',
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
    let index =  this.originaldata.findIndex((e:any)=>e.documento == value);
    this.originaldata.splice(index, 1);
    this.data = new MatTableDataSource<Cliente>(this.originaldata);
    localStorage.setItem('clientes', JSON.stringify(this.originaldata));


    Swal.fire({
      icon: 'success',
      title: 'Acción realizada',
      text: 'Fue eliminado correctamente',
    })
  }

  
}
