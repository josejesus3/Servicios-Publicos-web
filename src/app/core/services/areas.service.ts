import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { Area } from "../models/area/areaRequest.model";

@Injectable({
    providedIn:'root',
})

export class AreaService{
private http=inject(HttpClient);
private apiUrl=environment.ApiUrl;

getAreas():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/areas`);

}
}