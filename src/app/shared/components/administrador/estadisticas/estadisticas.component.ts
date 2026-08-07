import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatCardActions, MatCardContent, MatCard } from "@angular/material/card";

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [MatIcon, MatCardActions, MatCardContent, MatCard],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.scss'
})
export class EstadisticasComponent {

}
