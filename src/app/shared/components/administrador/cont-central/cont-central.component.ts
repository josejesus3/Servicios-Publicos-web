import { Component } from '@angular/core';
import { MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCard } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-cont-central',
  standalone: true,
  imports: [MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCard, MatIcon],
  templateUrl: './cont-central.component.html',
  styleUrl: './cont-central.component.scss'
})
export class ContCentralComponent {

}
