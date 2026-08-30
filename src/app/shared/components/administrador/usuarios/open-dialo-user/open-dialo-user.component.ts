import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserModel } from '../../../../../core/models/user/user.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { AreaService } from '../../../../../core/services/areas.service';
import { Area } from '../../../../../core/models/area/areaRequest.model';
import { AdministradorService } from '../../../../../core/services/administrador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-open-dialo-user',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './open-dialo-user.component.html',
  styleUrl: './open-dialo-user.component.scss'
})
export class OpenDialoUserComponent {
  public dialogRef = inject(MatDialogRef<OpenDialoUserComponent>);
  private fb = inject(FormBuilder);
  form: FormGroup;
  areas: Area[] = [];
  id: number = 0;
  role: number = 0;
  private adminService = inject(AdministradorService);
  private areaService = inject(AreaService);

  constructor(@Inject(MAT_DIALOG_DATA) public userData: UserModel) {
    this.id = userData?.id;
    this.role = userData?.role_id;
    this.form = this.fb.group({
      name: [userData?.name || '', Validators.required],
      email: [userData?.email || '', [Validators.required, Validators.email]],
      password: ['', this.id ? [] : Validators.required],
      role_id: [userData?.role_id || '', Validators.required],
      area_id: [userData?.area_id || '', Validators.required],
      estado: [userData?.estado],
    });
    this.loadArea();
    this.changeRole();
  }
  roles = [
    { 'id': 2, 'name': 'Ciudadano', 'slug': 'Ciud' },
    { 'id': 3, 'name': 'Director', 'slug': 'Dir' },
    { 'id': 4, 'name': 'Ventanila', 'slug': 'Vent' }
  ]
  close() {
    this.dialogRef.close();
  }

  loadArea() {
    this.areaService.getAreas().subscribe({
      next: (resp) => {
        this.areas = resp.data;
      }, error: (err) => {
        console.error('Error loading areas', err);
      }
    }
    );
  }
  changeRole() {
    if (this.role == 2 || this.role == 4) {
      this.form.patchValue({
        area_id: null
      });
      this.form.get('area_id')?.disable();
    } else {
      this.form.get('area_id')?.enable();
    }

    this.form.get('role_id')?.valueChanges.subscribe(resp => {
      if (resp === '2' || resp === '4') {
        this.form.patchValue({
          area_id: null
        });
        this.form.get('area_id')?.disable();
      } else {
        this.form.get('area_id')?.enable();
      }
    });


  }
  crearUsuario() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      const data = this.form.getRawValue();

      // Si password está vacía, enviar 0
      if (this.id && !data.estado) {
        data.estado = 0;
      }
      if (data.area_id == null) {
        delete data.area_id;
      }
      if (!data.estado) {
        data.estado = 0;
      }
      this.adminService.postUsuario(data).subscribe({
        next: (resp) => {
          Swal.fire({
            icon: 'success',
            title: '¡Usuario creado!',
            text: 'Tu usuario se ha registrado correctamente.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#F97316',
            allowOutsideClick: false,
            allowEscapeKey: false
          });
          this.dialogRef.close(resp);

        }, error: (err) => {
          const mensaje = err.error?.message || 'Error inesperado';
          const mensajeLimpio = mensaje.split('.')[0] + '.';
          Swal.fire({
            icon: 'error',
            title: mensajeLimpio,
            text: 'Ocurrió un problema al crear un  nuevo usuario. Intenta nuevamente más tarde.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#dc2626'
          });

        }
      })
    }
  }
  editarUsuario() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.getRawValue();

    // Si password está vacía, no enviarla
    if (this.id && !data.password) {
      delete data.password;
    }

    // Si area_id es null, no enviarla
    if (this.id && data.area_id == null) {
      delete data.area_id;
    }

    this.adminService.putUsuario(this.id, data).subscribe({
      next: (resp) => {
        Swal.fire({
          icon: 'success',
          title: '¡Usuario Editado!',
          text: 'Tu usuario se ha editado correctamente.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#F97316',
          allowOutsideClick: false,
          allowEscapeKey: false
        });

        this.dialogRef.close(resp);
      },

      error: (err) => {
        const mensaje=err.error?.message||'Error inesperado';
        const mensajeLimpio=mensaje.split('.');
        Swal.fire({
          icon: 'error',
          title: mensajeLimpio,
          text: 'Ocurrió un problema al editar el usuario.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#dc2626'
        });

        console.error('Error editando usuario:', err);
      }
    });
  }
}
