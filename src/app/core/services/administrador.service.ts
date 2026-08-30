import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user/user.model';
import { Area } from '../models/area/areaRequest.model';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private http = inject(HttpClient);
  private apiUrl = environment.ApiUrl;

  getUsuarioAll(page: number, perPage: number, filter: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users?page=${page}&per_page=${perPage}&filter=${filter}`)
  }

  getAreasAll(page: number=1, perPage: number=10, filter: string=''): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/areasAll?page=${page}&per_page=${perPage}&filter=${filter}`);
  }
  getIncidentAll(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getIncidentAll`)

  }

  postUsuario(user: UserModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/userStore`, user);

  }
  putUsuario(id: number, user: UserModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/userUpdated/${id}`, user);
  }
  postAreas(area:Area):Observable<any>{
    return this.http.post(`${this.apiUrl}/areaStore`, area)
  }
   putAreas(id:number,area:Area):Observable<any>{
    return this.http.put(`${this.apiUrl}/areaUpdated/${id}`, area)
  }




}
