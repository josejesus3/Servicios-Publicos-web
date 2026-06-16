import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-incident-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incident-list.component.html',
  styleUrl: './incident-list.component.scss'
})
export class IncidentListComponent implements OnInit {

  private http = inject(HttpClient);
  private apiUrl = environment.ApiUrl;
  incident: any[] = [];
  areas: any[] = [];
  ngOnInit(): void {
    this.getIncident();
  }


  getIncident() {
    return this.http.get<any>(`${this.apiUrl}/incident`).subscribe({
      next: (response) => {
        this.incident = response.data.data;
        this.areas = response.data.data.map((item: any) => item.area);
        console.log(this.incident);


      }, error: (err) => {
        console.error('Error:', err);
      }
    });
  }
  getIconos(categorias: string) {
    const iconos: any = {
      'Limpieza': 'bi bi-trash-fill text-info fs-3',
      'Bacheo': 'bi bi-signpost-fill text-warning fs-3',
      'Alumbrado Público': 'bi bi-lightbulb-fill text-warning fs-3',
      'Fuga de Agua': 'bi bi-droplet-fill text-primary fs-3',
      'Áreas Verdes': 'bi bi-tree-fill text-success fs-3',
      'Agua Potable': 'bi bi-droplet-half text-primary fs-3',
      'Aseo Público': 'bi bi-trash3-fill text-info fs-3',
      'Parques y Jardines': 'bi bi-tree-fill text-success fs-3'
    };

    return iconos[categorias] || 'fa-solid fa-circle-info';
  }
  getStatus(status: string) {
    const statusColor: any = {
      'pendiente': '#FFF3CD',     // Amarillo suave (pendiente de atención)
      'en_proceso': '#CFE2FF',    // Azul suave (trabajándose)
      'finalizado': '#D1E7DD'     // Verde suave (completado)
    };

    return statusColor[status];
  }




}
