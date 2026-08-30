import { Component, inject, OnInit } from '@angular/core';
import { IncidentListComponent } from "./pages/incident-list/incident-list.component";
import { MatDialog } from '@angular/material/dialog';
import { IncidentCreateComponent } from './pages/incident-create/incident-create.component';
import { Incident } from '../../core/models/incident/incidentRequest.model';
import { IncidentService } from '../../core/services/incident.service';
import { PageEvent } from '@angular/material/paginator';
import { environment } from '../../../environments/environment';
import { MatFormFieldModule, } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatSelect, MatOption, MatSelectChange } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgFor } from '@angular/common';
import { Area } from '../../core/models/area/areaRequest.model';
import { AdministradorService } from '../../core/services/administrador.service';



@Component({
  selector: 'app-incidents',
  standalone: true,
  imports: [IncidentListComponent, MatFormFieldModule, MatInput, MatSelect, MatOption, ReactiveFormsModule, NgFor, FormsModule],
  templateUrl: './incidents.component.html',
  styleUrl: './incidents.component.scss'
})
export class IncidentsComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  incident: Incident[] = [];
  pageCurret: any;
  filter = '';
  incidentService = inject(IncidentService);
  private areasService = inject(AdministradorService);
  areas: Area[] = [];
  private times: any;
  urlImage = environment.UrlImage;
  categoria: number = 0;
  estado: string = '';
  ngOnInit(): void {
    this.getIncident();
    this.getAreasAll();
  }
  getAreasAll() {
    this.areasService.getAreasAll().subscribe({
      next: (resp) => {
        this.areas = resp.areas?.data;
      }

    })

  }
  onPageChange(event: PageEvent) {
    this.getIncident(event.pageIndex + 1, event.pageSize);
  }
  onFiltroCat(event: MatSelectChange) {

    this.categoria = event.value;
    console.log('categoria', this.categoria)
    this.getIncident();
  }
  onFiltroEst(event: MatSelectChange) {

    this.estado = event.value;
    console.log('estado', this.estado)
    this.getIncident();
  }
 reiniciarValores() {
  this.filter = '';
  this.categoria = 0;
  this.estado = '';

  this.getIncident();
}
  onBuscador() {
    clearTimeout(this.times);
    this.times = setTimeout(() => {
      this.getIncident();
    }, 400)

  }


  getIncident(page: number = 1, perPage: number = 10) {
    return this.incidentService.getIncident(page, perPage, this.filter, this.categoria, this.estado).subscribe({
      next: (response) => {
        this.incident = response.data.data;
        this.pageCurret = response.data;
        this.incident.forEach((media) => {
          media.media.filter((image) => {
          })
        })
      }, error: (err) => {
        console.error('Error:', err);
      }
    }
    );
  }
  openDialog(): void {

    const dialogRef = this.dialog.open(IncidentCreateComponent, {
      width: '100%',
      maxWidth: '800px',
      height: '700px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getIncident(); // 🔥 refresca lista
      }
    });
  }

}
