import { Component } from '@angular/core';
import { CategoryComponentComponent } from "./components/category-component/category-component.component";
import { HeaderComponentComponent } from "./components/header-component/header-component.component";
import { ChartSummaryComponent } from "./components/chart-summary/chart-summary.component";
import { LoginComponent } from "../auth/login/login.component";
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CategoryComponentComponent, HeaderComponentComponent, ChartSummaryComponent, LoginComponent, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
