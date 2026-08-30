import { Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';
import { filter } from 'rxjs';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isMenuOpen: boolean = false;
  authService = inject(AuthService);
  private route = inject(Router);
  private router = inject(Router)
  isMenuVisible: boolean = false;
  user: string | undefined = '';
  email: string | undefined = '';
  @ViewChild('menuSesion') menuSesion!: ElementRef;

  ngOnInit(): void {
    this.user = this.authService.getUser()?.name;
    this.email = this.authService.getUser()?.email;
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.isMenuOpen = false;
        this.isMenuVisible = false;
      });
  }

  @HostListener('document:click', ['$event'])
  clickFuera(event: Event) {
    // Si el menú está abierto y el clic NO ocurrió dentro de #menuSesion, lo cerramos
    if (this.isMenuVisible && this.menuSesion) {
      const clicAdentro = this.menuSesion.nativeElement.contains(event.target);
      if (!clicAdentro) {
        this.isMenuVisible = false;
      }
    }
  }



  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  toggleVisible() {
    this.isMenuVisible = !this.isMenuVisible;
  }
  cerrarSesion() {
    this.authService.logout();
    this.route.navigateByUrl('inicio').then(() => {
      Swal.isLoading();
      window.location.reload();
    });
  }

}
