import { Component } from '@angular/core';
import { ChartSummaryComponent } from "../chart-summary/chart-summary.component";

@Component({
  selector: 'app-evolution',
  standalone: true,
  imports: [ChartSummaryComponent],
  templateUrl: './evolution.component.html',
  styleUrl: './evolution.component.scss'
})
export class EvolutionComponent {

}
