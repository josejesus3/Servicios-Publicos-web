import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatCardContent, MatCardTitle, MatCardHeader, MatCard } from "@angular/material/card";

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MatIcon, MatCardContent, MatCardTitle, MatCardHeader, MatCard],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

}
