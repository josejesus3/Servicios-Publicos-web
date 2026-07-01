import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IncidentCreateComponent } from '../../../incidents/pages/incident-create/incident-create.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-action-component',
  standalone: true,
  imports: [],
  templateUrl: './report-action-component.component.html',
  styleUrl: './report-action-component.component.scss'
})
export class ReportActionComponentComponent {
  readonly dialog = inject(MatDialog);
  private route = inject(Router);

  openDialog(): void {
    const dialogRef = this.dialog.open(IncidentCreateComponent, {
      width: '900px',
      maxWidth: '1000px',
      height: '700px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.route.navigate(['misReportes']);
      }
    })





  }

}
