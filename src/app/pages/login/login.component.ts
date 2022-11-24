import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userLog: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.userLog = new FormGroup({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }



  onSubmit(){
    if(this.userLog.valid){
      let user = this.userLog.value.user; 
      let password = this.userLog.value.password;
      if(user == 'admin2022' && password == 'Admin1234567'){
        localStorage.setItem('token', 'true')
        this.router.navigateByUrl('/');
      }else{
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Usuario incorrecto',
        })
      }
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Debe diligenciar todos los campos',
      })
    }
  }
}
