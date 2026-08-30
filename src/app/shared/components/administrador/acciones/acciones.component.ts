import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatCardContent, MatCardTitle, MatCardHeader, MatCard } from "@angular/material/card";

@Component({
  selector: 'app-acciones',
  standalone: true,
  imports: [MatIcon, MatCardContent, MatCardTitle, MatCardHeader, MatCard],
  templateUrl: './acciones.component.html',
  styleUrl: './acciones.component.scss'
})
export class AccionesComponent {

}
