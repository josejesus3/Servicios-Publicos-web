import { Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardSubtitle } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { EstadisticasComponent } from "./estadisticas/estadisticas.component";
import { ContCentralComponent } from "./cont-central/cont-central.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { ActividadesRecientesComponent } from "./actividades-recientes/actividades-recientes.component";
import { AreasComponent } from "./areas/areas.component";

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatIcon, MatCardSubtitle, EstadisticasComponent, ContCentralComponent, UsuariosComponent, ActividadesRecientesComponent, AreasComponent],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.scss'
})
export class AdministradorComponent {

}
