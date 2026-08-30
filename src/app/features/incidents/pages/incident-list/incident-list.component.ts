import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { Incident } from '../../../../core/models/incident/incidentRequest.model';
import { IncidentService } from '../../../../core/services/incident.service';
import { IncidentCreateComponent } from '../incident-create/incident-create.component';
import { environment } from '../../../../../environments/environment';
import { ImageFullComponent } from './image-full/image-full.component';
import { IncidentDetailComponent } from '../incident-detail/incident-detail.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-incident-list',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatTooltip, RouterLink],
  templateUrl: './incident-list.component.html',
  styleUrl: './incident-list.component.scss'
})
export class IncidentListComponent {

  @Input() incident: Incident[] = [];
  @Input() pageCurret!: any;
  @Output() refresh = new EventEmitter();
  @Output() pageChange = new EventEmitter<PageEvent>();
  public auth=inject(AuthService);
  urlImage = environment.UrlImage;

  readonly dialog = inject(MatDialog);
  private incidenService = inject(IncidentService);
  changePage(event: PageEvent) {
    this.pageChange.emit(event);
  }

  confirmaEliminar(id: number) {
    Swal.fire({
      title: '¿Eliminar?',
      text: 'No podrás recuperarlo.',
      icon: 'warning',
      position: 'center',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'mi-popup',
        confirmButton: 'btn-eliminar'
      }
    }).then(result => {
      if (result.isConfirmed) {
        this.deleteIncident(id);
      }
    });
  }

  deleteIncident(id: number): void {
    this.incidenService.destroyIncident(id).subscribe({
      next: () => {
        this.refresh.emit();
        this.showDeleteSuccess();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  private showDeleteSuccess(): void {
    Swal.fire({
      html: `
        <h3>Eliminado</h3>
        <p>El reporte se eliminó correctamente.</p>
      `,
      showConfirmButton: false,
      timer: 2000,
      icon: 'error',
      background: '#fff',
      position: 'center',
      customClass: {
        popup: 'mi-popup'
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
      'pendiente': '#f54a24c1',
      'en_proceso': '#CFE2FF',
      'finalizado': '#D1E7DD'
    };

    return statusColor[status];
  }

  openDialog(incident: Incident): void {
    const dialogRef = this.dialog.open(IncidentCreateComponent, {
      data: incident,
      width: '750px',
      maxWidth: '1000px',
      height: '700px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.refresh.emit();
        Swal.fire({
          showConfirmButton: false,
          icon: 'success',
          html: `
        <h3>Actualizado</h3>
        <p>El reporte se actualizo correctamente.</p>
      `,
          timer: 1700,
          position: 'center',
          customClass: {
            popup: 'mi-popup'
          }
        })
      }
    });
  }
  fullDialog(img: string) {
    this.dialog.open(ImageFullComponent, {
      data: img,
      width: 'auto',
      height: 'auto',
      maxWidth: '95vw',
      maxHeight: '95vh',
    })
  }

  verDetalle(inciden: Incident) {
    this.dialog.open(IncidentDetailComponent, {
      data: inciden,
      width: '750px',
      maxWidth: '1000px',
      height: '700px',

    })

  }
}