import { Component } from '@angular/core';
import { NavbarComponent } from "../shared/components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../shared/components/footer/footer.component";


@Component({
  selector: 'app-layaut',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './layaut.component.html',
  styleUrl: './layaut.component.scss'
})
export class LayautComponent {

}
