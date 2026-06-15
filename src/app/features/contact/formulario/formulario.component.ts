import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
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
      placeholder: 'Ingresa tu nombre completo'
    },
    {
      label: 'Correo electrónico',
      name: 'email',
      type: 'email',
      placeholder: 'Ingresa tu correo electrónico'
    },
    {
      label: 'Asunto',
      name: 'subject',
      type: 'text',
      placeholder: 'Ingresa el asunto'
    },
    {
      label: 'Mensaje',
      name: 'message',
      type: 'textarea',
      placeholder: 'Escribe tu mensaje'
    }
  ];
  ngOnInit(): void {
    this.initFrom()
  }

  initFrom() {
    const formGroupConfig: any = {};

    this.contactFields.forEach(item => {
      const validator = [Validators.required]
      if (item.type === 'email') {
        validator.push(Validators.email);
      }
      formGroupConfig[item.name] = ['', validator];
    });

    this.form = this.fb.group(formGroupConfig);

  }

  onSubmit() {
    if (this.form.valid) {
      console.log('¡Formulario enviado con éxito!', this.form.value);
      this.form.reset();

    } else {
      this.form.markAllAsTouched()
    }
  }

}
