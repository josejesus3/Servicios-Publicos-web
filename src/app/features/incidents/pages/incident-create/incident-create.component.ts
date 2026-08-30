import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, MatDialogContainer } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { AreaService } from '../../../../core/services/areas.service';
import { Area } from '../../../../core/models/area/areaRequest.model';
import { IncidentService } from '../../../../core/services/incident.service';
import { IncidentRequest } from '../../../../core/models/incident/incidenRespuesta.model';
import { Incident } from '../../../../core/models/incident/incidentRequest.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-incident-create',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatIconModule,],
  templateUrl: './incident-create.component.html',
  styleUrl: './incident-create.component.scss'
})
export class IncidentCreateComponent implements OnInit {

  selectedCategory: number;
  areas: Area[] = [];
  id: number;
  selectfileMedia: File[] = [];

  form: FormGroup;

  private areaService = inject(AreaService);
  private incidentService = inject(IncidentService);
  private dialogRef = inject(MatDialogRef<IncidentCreateComponent>);
  private fb = inject(FormBuilder);

  constructor(@Inject(MAT_DIALOG_DATA) public reporte: Incident) {

    this.id = reporte?.id || 0;
    this.selectedCategory = reporte?.area_id || 0;
    this.form = this.fb.group({
      title: [reporte?.title || '', Validators.required],
      description: [reporte?.description || '', [Validators.required, Validators.maxLength(200)]],
      direction: [reporte?.direction || '', Validators.required],
      latitude: [reporte?.latitude || ''],
      longitude: [reporte?.longitude || ''],
      area_id: [reporte?.area_id || '', Validators.required],
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
  onFileSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Convertir FileList de manera segura a un arreglo de archivos reales
      this.selectfileMedia = Array.from(files);

      // IMPORTANTE: Pon este console.log para verificar que existan objetos File reales
      console.log('Archivos listos para enviar:', this.selectfileMedia);
    }
  }

  nuevoIncidente() {
    const formValue = this.form.value;
    const formData = new FormData();

    this.selectfileMedia.forEach((file) => {
      formData.append('archivos[]', file, file.name);
    });

    formData.append('title', formValue.title);
    formData.append('description', formValue.description);
    formData.append('direction', formValue.direction);
    formData.append('area_id', formValue.area_id.toString());
    this.incidentService.postIncident(formData).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: '¡Reporte enviado!',
          text: 'Tu reporte se ha registrado correctamente. Gracias por ayudar a mejorar tu comunidad.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#F97316',
          allowOutsideClick: false,
          allowEscapeKey: false
        });
        this.dialogRef.close(res); // mejor cerrar con respuesta real
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar reporte',
          text: 'Ocurrió un problema al enviar el reporte. Intenta nuevamente más tarde.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#dc2626'
        });
        console.error('Error creando incidente:', err);
      }
    });
  }
  editarIncidente() {
    const formData = new FormData();
    const formValue = this.form.value;
    this.selectfileMedia.forEach((file)=>{
      formData.append('archivos[]',file,file.name)
    });


    formData.append('title', formValue.title);
    formData.append('description', formValue.description);
    formData.append('direction', formValue.direction);
    formData.append('area_id', formValue.area_id.toString());

    this.incidentService.putIncident(this.id, formData).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Reporte actualizado correctamente',
          text: 'Los cambios del reporte fueron guardados y enviados correctamente.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#ff6a00'
        });
        this.dialogRef.close(res); // mejor cerrar con respuesta real
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar reporte',
          text: 'No fue posible guardar los cambios del reporte. Intenta nuevamente.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#dc2626'
        });
        console.error('Error Editando incidente:', err);
      }
    })



  }

  // =========================
  // SUBMIT
  // =========================
  submit(): void {

    if (this.form.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos obligatorios antes de enviar tu reporte.',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#F97316'
      });
      this.form.markAllAsTouched();
      return;
    } else if (this.id) {
      this.editarIncidente();
      console.log("editado");
    } else {
      this.nuevoIncidente();


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