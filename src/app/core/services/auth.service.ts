import { HttpClient } from '@angular/common/http';
import {Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginRequest } from '../models/user/loginRequest.model';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../models/user/registerRequest.model';
import { UserModel } from '../models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.ApiUrl;
  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  saveSession(response: any): void {
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): UserModel | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  hasRole(role: number): boolean {
    const user = this.getUser();
    if(role===1 ||role===4){
      return user?.role_id === role;
    }
    return false;
  }
}
