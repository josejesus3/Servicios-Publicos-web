import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatCardContent, MatCardHeader, MatCardTitle, MatCard } from "@angular/material/card";

@Component({
  selector: 'app-areas',
  standalone: true,
  imports: [MatIcon, MatCardContent, MatCardHeader, MatCardTitle, MatCard],
  templateUrl: './areas.component.html',
  styleUrl: './areas.component.scss'
})
export class AreasComponent {

}
