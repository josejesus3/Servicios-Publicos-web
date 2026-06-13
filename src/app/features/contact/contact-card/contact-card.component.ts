import { NgFor, NgStyle } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [NgFor, NgStyle],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.scss'
})
export class ContactCardComponent {
  contactInfo = [
    {
      icon: 'bi-geo-alt',
      title: 'Dirección',
      lines: [
        'Obregón 58, Centro',
        'El Grullo, Jalisco, C.P. 48740'
      ]
    },
    {
      icon: 'bi-telephone',
      title: 'Teléfono',
      lines: ['321 387 4400']
    },
    {
      icon: 'bi-envelope',
      title: 'Correo electrónico',
      lines: ['contacto@elgrullo.gob.mx']
    },
    {
      icon: 'bi-clock',
      title: 'Horarios de atención',
      lines: [
        'Lunes a Viernes',
        '8:00 a.m. - 4:00 p.m.'
      ]
    }
  ];

  socialNetworks = [
  {
    name: 'Facebook',
    icon: 'bi-facebook',
    color: '#1877F2',
    url: 'https://facebook.com'
  },
  {
    name: 'Instagram',
    icon: 'bi-instagram',
    color: '#E4405F',
    url: 'https://instagram.com'
  },
  {
    name: 'YouTube',
    icon: 'bi-youtube',
    color: '#FF0000',
    url: 'https://youtube.com'
  },
  {
    name: 'WhatsApp',
    icon: 'bi-whatsapp',
    color: '#25D366',
    url: 'https://wa.me/'
  }
];

}
