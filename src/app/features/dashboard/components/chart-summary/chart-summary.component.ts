import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { IncidentService } from '../../../../core/services/incident.service';
import { Area } from '../../../../core/models/area/areaRequest.model';
import { Incident } from '../../../../core/models/incident/incidentRequest.model';

@Component({
  selector: 'app-chart-summary',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './chart-summary.component.html',
  styleUrl: './chart-summary.component.scss'
})
export class ChartSummaryComponent implements OnInit {
  incidentService = inject(IncidentService)
  incident: Incident[] = [];
  ngOnInit(): void {
    this.getIncident();
  }
  //this.areas = response.data.data.map((item: any) => item.area);

  getIncident() {
    return this.incidentService.getIncidentAll().subscribe({
      next: (response) => {
        this.incident = response.data.data;
      }, error: (err) => {
        console.error('Error:', err);
      }
    }
    );
  }
  getIconos(categorias: string) {
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

    return iconos[categorias] || 'fa-solid fa-circle-info';
  }
  getStatus(status: string) {
    const statusColor: any = {
      'pendiente': '#f54a24c1',     // Amarillo suave (pendiente de atención)
      'en_proceso': '#CFE2FF',    // Azul suave (trabajándose)
      'finalizado': '#D1E7DD'     // Verde suave (completado)
    };

    return statusColor[status];
  }




}
