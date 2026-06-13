import { Component } from '@angular/core';
import { ContactCardComponent } from "./contact-card/contact-card.component";
import { FormularioComponent } from "./formulario/formulario.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactCardComponent, FormularioComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
