import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isMenuOpen: boolean = false;
  authService = inject(AuthService);
  private route=inject(Router);

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  cerrarSesion() {
   this.authService.logout();
  this.route.navigateByUrl('inicio').then(() => {
    Swal.isLoading();
    window.location.reload();
  });
  }

}
