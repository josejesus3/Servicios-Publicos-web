import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatAccordion } from "@angular/material/expansion";
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [NgIf, MatError, MatLabel, MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent implements OnInit {
  private fb = inject(FormBuilder);
  form!: FormGroup;
  contactFields = [
    {
      label: 'Nombre completo',
      name: 'fullName',
      type: 'text',
      placeholder: 'Ingresa tu nombre completo',
      icon: 'bi bi-person icon-orange fs-5'
    },
    {
      label: 'Correo electrónico',
      name: 'email',
      type: 'email',
      placeholder: 'Ingresa tu correo electrónico',
      icon: 'bi bi-envelope icon-orange fs-5'
    },
    {
      label: 'Asunto',
      name: 'subject',
      type: 'text',
      placeholder: 'Ingresa el asunto',
      icon: 'bi bi-tag icon-orange fs-5'
    },
    {
      label: 'Mensaje',
      name: 'message',
      type: 'textarea',
      placeholder: 'Escribe tu mensaje',
      icon: 'bi bi-chat-text icon-orange fs-5'
    }
  ];
  ngOnInit(): void {
    this.initFrom()
  }

  initFrom() {
  const formGroupConfig: any = {};

  this.contactFields.forEach(item => {
    const validator = [Validators.required];

    if (item.type === 'textarea') {
      validator.push(Validators.maxLength(300));
    }

    if (item.type === 'email') {
      validator.push(Validators.email);

      formGroupConfig[item.name] = [
        {
          value: 'coordinacion.servicios-municipales@elgrullo.gob.mx',
          disabled: true
        },
        validator
      ];

      return;
    }

    formGroupConfig[item.name] = ['', validator];
  });

  this.form = this.fb.group(formGroupConfig);
}

  onSubmit() {
    if (this.form.valid) {

      Swal.fire({
        title: '¡Éxito!',
        text: '¡Enviado correctamente!',
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#f26822', // Tu color naranja
        background: '#ffffff',
        customClass: {
          title: 'fs-4 font-weight-normal', // Usando clases de Bootstrap o CSS propio
          popup: 'swal2-custom-success' // Clase personalizada para el icono
        }
      });
      console.log(this.form.value);
      this.form.reset();

    } else {
      Swal.fire({
        title: '¡Ups! Algo salió mal',
        text: 'No pudimos enviar tu mensaje en este momento. Por favor, revisa todos tus campos o tu conexión ',
        icon: 'error',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#ec5a5a', // Un color oscuro neutro
        background: '#ffffff',
        // Título también pequeño en el error para mantener la coherencia
        customClass: {
          title: 'fs-4'
        }
      });
      this.form.markAllAsTouched()
    }
  }

}
