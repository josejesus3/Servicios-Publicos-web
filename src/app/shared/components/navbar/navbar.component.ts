import { Component, inject} from '@angular/core';
import { FormsModule} from '@angular/forms';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isMenuOpen:boolean=false;
  authService=inject(AuthService);

  toggleMenu(){
    this.isMenuOpen=!this.isMenuOpen;
  }

}
