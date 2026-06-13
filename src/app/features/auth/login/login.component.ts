import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginRequest } from '../../../core/models/user/loginRequest.model';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email:string="";
  password:string="";

  

  private authService=inject(AuthService);
  private router=inject(Router);

  login(){
    const credenciales:LoginRequest={
    email:this.email,
    password:this.password
  }
    this.authService.login(credenciales).subscribe({
      next:(response)=>{
        this.authService.saveSession(response);

        const user=this.authService.getUser();

        if(user?.role_id===1){
          console.log("Es admin");
        }else if(user?.role_id===4){
          console.log(user.role_id);

        }else{
           console.log(user);
        }

      }, error: (error) => {
        console.error('Error de login', error);
      }
    });
    this.router.navigate(['']);

  }
 
}
