import { Component } from '@angular/core';
import { CategoryChartComponentComponent } from "../category-chart-component/category-chart-component.component";
import { ReportActionComponentComponent } from "../report-action-component/report-action-component.component";

@Component({
  selector: 'app-category-component',
  standalone: true,
  imports: [CategoryChartComponentComponent, ReportActionComponentComponent],
  templateUrl: './category-component.component.html',
  styleUrl: './category-component.component.scss'
})
export class CategoryComponentComponent {
  

}
