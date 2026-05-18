import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./features/auth/login/login.component";
import { HeaderComponentComponent } from "./features/dashboard/components/header-component/header-component.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent, HeaderComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Servicios-Publicos-web';
}
