import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./features/auth/login/login.component";
import { HeaderComponentComponent } from "./features/dashboard/components/header-component/header-component.component";
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { DashboardComponent } from "./features/dashboard/dashboard.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent, HeaderComponentComponent, NavbarComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Servicios-Publicos-web';
}
