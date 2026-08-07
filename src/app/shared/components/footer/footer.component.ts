import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CardFooterComponent } from "./card-footer/card-footer.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CardFooterComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  iconEnlace = 'bi bi-link-45deg';
  labelEnlace = 'Enlaces Rapidos';
  iconContacto = 'bi bi-telephone';
  labelContacto = 'Contactos';
  quickLinks = [
    {
      label: 'Inicio',
      icon: 'bi bi-house-door',
      route: 'inicio'
    },
    {
      label: 'Nuevo Reporte',
      icon: 'bi bi-clipboard-plus',
      route: 'reportes'
    },
    {
      label: 'Mis Reportes',
      icon: 'bi bi-list-ul',
      route: 'misReportes'
    },
    {
      label: 'Ayuda / Preguntas',
      icon: 'bi bi-question-circle',
      route: 'ayuda'
    },
    {
      label: 'Aviso de Privacidad',
      icon: 'bi bi-shield-lock',
      route: 'aviso-privacidad'
    },
    {
      label: 'Términos y Condiciones',
      icon: 'bi bi-file-earmark-text',
      route: 'terminos'
    },
    {
      label: 'Accesibilidad',
      icon: 'bi bi-universal-access',
      route: 'accesibilidad'
    }
  ];

  contactInfo = [
    {
      icon: 'bi bi-geo-alt',
      label: 'Palacio Municipal',
      subtitle: 'El Grullo, Jalisco'
    },
    {
      icon: 'bi bi-telephone',
      label: '(321) 387 44 00',
      href: 'tel:+523213874400'
    },
    {
      icon: 'bi bi-envelope',
      label: 'reportes@elgrullo.gob.mx',
      href: 'mailto:reportes@elgrullo.gob.mx'
    },
    {
      icon: 'bi bi-globe',
      label: 'www.elgrullo.gob.mx',
      href: 'https://www.elgrullo.gob.mx'
    }
  ];

}
