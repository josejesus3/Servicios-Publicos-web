import { Component, Inject, inject, Output } from '@angular/core';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Area } from '../../../../../core/models/area/areaRequest.model';
import { AdministradorService } from '../../../../../core/services/administrador.service';
import Swal from 'sweetalert2';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-open-dialog-areas',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSlideToggleModule, MatTooltip],
  templateUrl: './open-dialog-areas.component.html',
  styleUrl: './open-dialog-areas.component.scss'
})
export class OpenDialogAreasComponent {
  private dialogRef = inject(MatDialogRef<OpenDialogAreasComponent>)
  public form: FormGroup;
  private fb = inject(FormBuilder);
  id: number = 0;
  private adminService = inject(AdministradorService);
   icono: any = [
      {area:'Limpieza',icon: 'bi bi-trash-fill text-info fs-2'},
      {area:'Bacheo',icon: 'bi bi-signpost-fill text-warning fs-2'},
      {area:'Alumbrado Público',icon: 'bi bi-lightbulb-fill text-warning fs-2'},
      {area:'Fuga de Agua',icon: 'bi bi-droplet-fill text-primary fs-2'},
      {area:'Áreas Verdes',icon: 'bi bi-tree-fill text-success fs-2'},
      {area:'Agua Potable',icon: 'bi bi-droplet-half text-primary fs-2'},
      {area:'Aseo Público',icon: 'bi bi-trash3-fill text-info fs-2'},
      {area:'Parques y Jardines',icon: 'bi bi-tree-fill text-success fs-2'}
];
  constructor(@Inject(MAT_DIALOG_DATA) public areaData: Area) {
    this.id = areaData?.id;
    this.form = this.fb.group({
      name: [areaData?.name || '', Validators.required],
      slug: [areaData?.slug || '', Validators.required],
      estado:[areaData?.estado],
      icono:[this.icono.icon,Validators.required],
    })

  }
  close() {
    this.dialogRef.close();
  }
  iconobuton(){
    console.log(this.form.value)
  }
  guardarArea() {
    console.log("areaDta:",this.form.value)
    this.adminService.postAreas(this.form.value).subscribe({
      next: (resp) => {
        Swal.fire({
          icon: 'success',
          title: '¡Area creado!',
          text: 'Tu Area se ha registrado correctamente.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#F97316',
          allowOutsideClick: false,
          allowEscapeKey: false
        });
        this.dialogRef.close(resp);

      }, error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar Area',
          text: 'Ocurrió un problema al crear una  nueva area. Intenta nuevamente más tarde.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#dc2626'
        });
        console.error('Error creando area:', err);
      }
    })
  }
  editarArea() {
    this.adminService.putAreas(this.id, this.form.value).subscribe({
      next: (resp) => {
        Swal.fire({
          icon: 'success',
          title: '¡Area Editada!',
          text: 'Tu Area se ha editado correctamente.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#F97316',
          allowOutsideClick: false,
          allowEscapeKey: false
        });
        this.dialogRef.close(resp);

      }, error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al editar Area',
          text: err ? 'Ocurrió un problema al editar area. Intenta nuevamente más tarde.' : err,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#dc2626'
        });
        console.error('Error creando area:', err);
      }
    })

  }

}
