import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../../core/models/user/loginRequest.model';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
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
      const credenciales:LoginRequest=this.form.value;
      this.authService.login(credenciales).subscribe({
        next: (response) => {
console.log(this.email, this.password,"entro")
          this.authService.saveSession(response);
          this.router.navigate(['inicio']);



        }, error: (error) => {
          console.error('Error de login', error);
        }
      });
      this.form.reset();

    } else {
      this.form.markAllAsTouched();
    }

  }

}
