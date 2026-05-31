import { Component } from '@angular/core';
import { CategoryComponentComponent } from "./components/category-component/category-component.component";
import { HeaderComponentComponent } from "./components/header-component/header-component.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CategoryComponentComponent, HeaderComponentComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
