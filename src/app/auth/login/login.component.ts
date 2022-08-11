import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  iniciarSesion(){
    if(!this.loginForm.valid){ return }
    Swal.fire({
      didOpen: () => {
        Swal.showLoading()
      }
    });

    const {email,password} = this.loginForm.value;

    this.auth.iniciarSesion(email, password)
    .then((credential)=>{
      console.log(credential)
      Swal.close();
      this.route.navigate(['/']);
    }).catch(err => {Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.message
    })})
  }

}
