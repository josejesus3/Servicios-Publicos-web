import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatCardActions, MatCardContent, MatCard } from "@angular/material/card";

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [MatIcon, MatCardActions, MatCardContent, MatCard],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.scss'
})
export class EstadisticasComponent implements OnChanges {
  @Input() areas = [];
  @Input() users = [];
  @Input() incidentes = [];

  atendidos: number = 0;
  ngOnChanges(): void {

    this.getStatus();
  }
  getStatus() {
    this.atendidos = this.incidentes.filter(item => {
      return item['status'] == 'finalizado'
    }).length
  }

}
