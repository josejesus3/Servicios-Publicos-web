import { Component } from '@angular/core';
import { IncidentListComponent } from "./pages/incident-list/incident-list.component";

@Component({
  selector: 'app-incidents',
  standalone: true,
  imports: [IncidentListComponent],
  templateUrl: './incidents.component.html',
  styleUrl: './incidents.component.scss'
})
export class IncidentsComponent {

}
