import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-category-chart-component',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatButtonModule],
  templateUrl: './category-chart-component.component.html',
  styleUrl: './category-chart-component.component.scss'
})
export class CategoryChartComponentComponent implements OnInit {
  areas:any[]=[];

  
  ngOnInit(): void {
    this.getAreas();
  }
  private apiUrl= environment.ApiUrl;
  private http=inject(HttpClient);

  getAreas(){
    this.http.get<any>(`${this.apiUrl}/areas`).subscribe({
      next:(response)=>{
      this.areas=response.data;
      console.log(this.areas);
      
      }
    });

  }

  getIconos(categorias:string){
   const iconos: any = {
  'Limpieza': 'bi bi-trash-fill text-info fs-2',
  'Bacheo': 'bi bi-signpost-fill text-warning fs-2',
  'Alumbrado Público': 'bi bi-lightbulb-fill text-warning fs-2',
  'Fuga de Agua': 'bi bi-droplet-fill text-primary fs-2',
  'Áreas Verdes': 'bi bi-tree-fill text-success fs-2',
  'Agua Potable': 'bi bi-droplet-half text-primary fs-2',
  'Aseo Público': 'bi bi-trash3-fill text-info fs-2',
  'Parques y Jardines': 'bi bi-tree-fill text-success fs-2'
};

  return iconos[categorias]|| 'fa-solid fa-circle-info';
  }


  


}
