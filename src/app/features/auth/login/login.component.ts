import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../../core/models/user/loginRequest.model';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, MatFormFieldModule, MatInput],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  form!: FormGroup;
  email: string = "";
  password: string = "";
  hidePassword = true;

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }



  login() {

    if (this.form.valid) {
      const credenciales: LoginRequest = this.form.value;
      this.authService.login(credenciales).subscribe({
        next: (response) => {
          this.authService.saveSession(response);
          Swal.fire({
            title: '¡Bienvenido!',
            text: 'Has iniciado sesión correctamente.',
            icon: 'success',
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#f26822',
            background: '#ffffff',
            allowEscapeKey:false,
            allowOutsideClick:false,
            customClass: {
              title: 'fs-4 font-weight-normal',
              popup: 'swal2-custom-success'
            }
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['inicio']);
            }
          });




        }, error: (error) => {
          Swal.fire({
            title: '¡Acceso denegado!',
            text: 'El correo electrónico o la contraseña son incorrectos. Por favor, verifica tus datos e inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Reintentar',
            confirmButtonColor: '#0f172a', // Un tono oscuro neutro para diferenciarlo del éxito
            background: '#ffffff',
            customClass: {
              title: 'fs-4 font-weight-normal'
            }
          });
        }
      });
      this.form.reset();

    } else {

      Swal.fire({
        title: '¡Atención!',
        text: 'Por favor, completa todos los campos correctamente para poder iniciar sesión.',
        icon: 'warning',
        confirmButtonText: 'Revisar',
        confirmButtonColor: '#f26822', // Usamos naranja para invitarlo a corregir
        background: '#ffffff',
        customClass: {
          title: 'fs-4 font-weight-normal'
        }
      });
      this.form.markAllAsTouched();
    }

  }

}
