import { Component } from '@angular/core';
import { CategoryComponentComponent } from "./components/category-component/category-component.component";
import { HeaderComponentComponent } from "./components/header-component/header-component.component";
import { ChartSummaryComponent } from "./components/chart-summary/chart-summary.component";
import { LoginComponent } from "../auth/login/login.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CategoryComponentComponent, HeaderComponentComponent, ChartSummaryComponent, LoginComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
