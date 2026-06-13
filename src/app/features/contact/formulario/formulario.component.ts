import { NgIf } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [NgIf],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent {
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

}
