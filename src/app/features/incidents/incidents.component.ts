import { Component, inject, OnInit } from '@angular/core';
import { IncidentListComponent } from "./pages/incident-list/incident-list.component";
import { MatDialog } from '@angular/material/dialog';
import { IncidentCreateComponent } from './pages/incident-create/incident-create.component';
import { Incident } from '../../core/models/incident/incidentRequest.model';
import { IncidentService } from '../../core/services/incident.service';

@Component({
  selector: 'app-incidents',
  standalone: true,
  imports: [IncidentListComponent],
  templateUrl: './incidents.component.html',
  styleUrl: './incidents.component.scss'
})
export class IncidentsComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  incident: Incident[] = [];
  pageCurret:any;
  incidentService = inject(IncidentService);

  ngOnInit(): void {
    this.getIncident();
  }
  getIncident() {
    return this.incidentService.getIncident().subscribe({
      next: (response) => {
        this.incident = response.data.data;
        this.pageCurret=response.data;
      }, error: (err) => {
        console.error('Error:', err);
      }
    }
    );
  }
  openDialog(): void {

    const dialogRef = this.dialog.open(IncidentCreateComponent, {
      width: '900px',
      maxWidth: '1000px',
      height: '700px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getIncident(); // 🔥 refresca lista
      }
    });
  }

}
