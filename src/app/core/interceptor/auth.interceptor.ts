import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, throwError, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => { // 2. Tipado explícito
        // Validamos el 401 y nos aseguramos de no romper la petición de login original
        if (error.status === 401 && !req.url.includes('/login')) { 
          this.authService.logout();
           Swal.fire({
                    icon: 'warning',
                    title: 'Sesion expirada',
                    text: 'vuelve a iniciar sesion',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#dcb826'
                    
                  }).then(resp=>{
                    if(resp.isConfirmed){
                      this.router.navigate(['/login']);
                    }
                  });
      
        }
        return throwError(() => error);
      })
    );
  }
}
