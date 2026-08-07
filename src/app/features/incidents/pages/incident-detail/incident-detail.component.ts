import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../../../environments/environment';
import { Incident } from '../../../../core/models/incident/incidentRequest.model';
import { ImageFullComponent } from '../incident-list/image-full/image-full.component';
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-incident-detail',
  standalone: true,
  imports: [CommonModule,MatDialogContent, MatDialogActions, MatButton, MatIcon, MatIconButton],
  templateUrl: './incident-detail.component.html',
  styleUrl: './incident-detail.component.scss'
})
export class IncidentDetailComponent {
  urlImage = environment.UrlImage
  incident: any;
  datosReporte: any[] = [];
  readonly dialogRef = inject(MatDialogRef);
  readonly dialog = inject(MatDialog);
  constructor(@Inject(MAT_DIALOG_DATA) public data: Incident) {
    this.incident = data
    
    console.log("data: ", this.incident)
    this.datosReporte = [
      { icono: "bi-check-circle-fill", color: "text-success", titulo: "Categoría", valor: this.incident.area['name'] },
      { icono: "bi-check-circle-fill", color: "text-success", titulo: "Descripción del problema", valor: this.incident.description },
      { icono: "bi-check-circle-fill", color: "text-success", titulo: "Dirección exacta", valor: this.incident.direction },
      { icono: "bi-check-circle-fill", color: "text-success", titulo: "Correo electrónico", valor: "usuario@correo.com" },

    ];

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
  close(): void {
    this.dialogRef.close();
  }
}
