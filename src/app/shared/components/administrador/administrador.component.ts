import { Component, inject, OnInit } from '@angular/core';
import { EstadisticasComponent } from "./estadisticas/estadisticas.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { ActividadesRecientesComponent } from "./actividades-recientes/actividades-recientes.component";
import { AreasComponent } from "./areas/areas.component";
import { AccionesComponent } from "./acciones/acciones.component";
import { AdministradorService } from '../../../core/services/administrador.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [EstadisticasComponent, UsuariosComponent, ActividadesRecientesComponent, AreasComponent, AccionesComponent],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.scss'
})
export class AdministradorComponent implements OnInit {

  private adminService = inject(AdministradorService);
  areas = [];
  users = [];
  incident = [];
  pageCurret: any;
  pageCurretArea: any;
  filter = '';

  loadingUser = false;
  loadingArea = false
  searchDoneUser = false;
  searchDoneArea = false;





  ngOnInit(): void {
    this.getUsuarios();
    this.getAreas();
    this.getIncident();
  }
  nextPage(event: PageEvent) {
    this.getUsuarios(event.pageIndex + 1, event.pageSize);
  }
  getUsuario(event: string) {
    this.filter = event;
    this.searchDoneUser = true;
    this.getUsuarios();
  }
  getArea(event: string) {
    this.filter = event;
    this.searchDoneArea = true;
    this.getAreas();

  }

  getUsuarios(page: number = 1, perPage: number = 10) {
    this.loadingUser = true;
    this.adminService.getUsuarioAll(page, perPage, this.filter).subscribe({
      next: resp => {
        this.users = resp.users?.data;
        this.pageCurret = resp?.users;
        this.loadingUser = false;

      }, error: error => {
        console.error(error);
        this.loadingUser = false;
      }


    });
  }

  getAreas(page: number = 1, perPage: number = 10) {
    this.loadingArea = true;
    this.adminService.getAreasAll(page, perPage, this.filter).subscribe({
      next: resp => {
        this.areas = resp.areas?.data;
        this.pageCurretArea = resp?.areas;
        this.loadingArea = false;
      }, error: error => {
        console.error(error);
        this.loadingArea = false;
      }

    })
  }
  getIncident() {
    this.adminService.getIncidentAll().subscribe(resp => {
      this.incident = resp.data;
    })
  }
}
