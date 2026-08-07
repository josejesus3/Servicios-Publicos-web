import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { FromGrup } from "../models/preguntas.models";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PreguntasServices {
    private urlLocal = 'json_preguntas/preguntas.json';
   private http = inject(HttpClient);

    getFrom():Observable<FromGrup[]>{
        return this.http.get<FromGrup[]>(this.urlLocal);
    }


}
