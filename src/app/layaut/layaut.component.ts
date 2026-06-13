import { Component } from '@angular/core';
import { NavbarComponent } from "../shared/components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-layaut',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './layaut.component.html',
  styleUrl: './layaut.component.scss'
})
export class LayautComponent {

}
