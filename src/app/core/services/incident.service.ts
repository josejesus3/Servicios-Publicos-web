import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incident } from '../models/incident/incidentRequest.model';
import { IncidentRequest } from '../models/incident/incidenRespuesta.model';

@Injectable({
    providedIn: 'root'
})
export class IncidentService {
    private apiUrl = environment.ApiUrl;
    private http = inject(HttpClient);

    getIncident(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/incident`);
    }

    postIncident(incident:IncidentRequest):Observable<any>{
     return this.http.post(`${this.apiUrl}/incident`,incident);

    }
    putIncident(id:number,incident:IncidentRequest):Observable<any>{
     return this.http.put(`${this.apiUrl}/incident/${id}`,incident);
    }
    destroyIncident(id:number):Observable<any>{
        console.log("servicio id:",id)
        return this.http.delete(`${this.apiUrl}/incident/${id}`);
    }
}