import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-actividades-recientes',
  standalone: true,
  imports: [MatIcon, MatCardModule],
  templateUrl: './actividades-recientes.component.html',
  styleUrl: './actividades-recientes.component.scss'
})
export class ActividadesRecientesComponent {

}
