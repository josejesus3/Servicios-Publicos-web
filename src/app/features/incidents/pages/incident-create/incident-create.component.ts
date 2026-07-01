import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { AreaService } from '../../../../core/services/areas.service';
import { Area } from '../../../../core/models/area/areaRequest.model';
import { IncidentService } from '../../../../core/services/incident.service';
import { IncidentRequest } from '../../../../core/models/incident/incidenRespuesta.model';
import { Incident } from '../../../../core/models/incident/incidentRequest.model';

@Component({
  selector: 'app-incident-create',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatIconModule, NgIf],
  templateUrl: './incident-create.component.html',
  styleUrl: './incident-create.component.scss'
})
export class IncidentCreateComponent implements OnInit {

  selectedCategory: number;
  areas: Area[] = [];
  id: number;

  form: FormGroup;

  private areaService = inject(AreaService);
  private incidentService = inject(IncidentService);
  private dialogRef = inject(MatDialogRef<IncidentCreateComponent>);
  private fb = inject(FormBuilder);

  constructor(@Inject(MAT_DIALOG_DATA) public reporte: Incident) {

    this.id = reporte?.id || 0;
    this.selectedCategory=reporte?.area_id||0;
    this.form = this.fb.group({
      title: [reporte?.title || '', Validators.required],
      description: [reporte?.description || '', Validators.required],
      direction: [reporte?.direction || '', Validators.required],
      latitude: [reporte?.latitude || ''],
      longitude: [reporte?.longitude || ''],
      area_id: [reporte?.area_id || '', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAreas();
  }

  // =========================
  // GET AREAS
  // =========================
  loadAreas(): void {
    this.areaService.getAreas().subscribe({
      next: (response) => {
        this.areas = response.data;
      },
      error: (err) => {
        console.error('Error loading areas', err);
      }
    });
  }

  // =========================
  // SELECT CATEGORY
  // =========================
  selectCate(area_id: number): void {
    this.selectedCategory = area_id;
    this.form.patchValue({ area_id });
  }

  nuevoIncidente() {
    const formValue = this.form.value;

    const payload: IncidentRequest = {
      title: formValue.title,
      description: formValue.description,
      direction: formValue.direction,
      area_id: formValue.area_id,
    };

    this.incidentService.postIncident(payload).subscribe({
      next: (res) => {
        this.dialogRef.close(res); // mejor cerrar con respuesta real
      },
      error: (err) => {
        console.error('Error creando incidente:', err);
      }
    });
  }
  editarIncidente() {
    const formValue = this.form.value;
    const payload: IncidentRequest = {
      title: formValue.title,
      description: formValue.description,
      direction: formValue.direction,
      area_id: formValue.area_id,
    };

    this.incidentService.putIncident(this.id, payload).subscribe({
      next: (res) => {
        this.dialogRef.close(res); // mejor cerrar con respuesta real
      },
      error: (err) => {
        console.error('Error Editando incidente:', err);
      }
    })



  }

  // =========================
  // SUBMIT
  // =========================
  submit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else if (this.id) {
      this.editarIncidente();
      console.log("editado");
    } else {
      this.nuevoIncidente();
      console.log("creado")
    }


  }

  // =========================
  // CLOSE
  // =========================
  close(): void {
    this.dialogRef.close();
  }

  // =========================
  // ICONOS
  // =========================
  getIconos(categoria: string): string {
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

    return iconos[categoria] || 'fa-solid fa-circle-info';
  }
}