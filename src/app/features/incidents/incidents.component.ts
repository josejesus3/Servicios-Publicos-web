import { Component, inject, OnInit } from '@angular/core';
import { IncidentListComponent } from "./pages/incident-list/incident-list.component";
import { MatDialog } from '@angular/material/dialog';
import { IncidentCreateComponent } from './pages/incident-create/incident-create.component';
import { Incident } from '../../core/models/incident/incidentRequest.model';
import { IncidentService } from '../../core/services/incident.service';
import { PageEvent } from '@angular/material/paginator';
import { environment } from '../../../environments/environment';
import { MatFormFieldModule,} from "@angular/material/form-field";
import { MatInput, MatInputModule } from "@angular/material/input";
import { MatSelect, MatOption, MatSelectChange } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-incidents',
  standalone: true,
  imports: [IncidentListComponent, MatFormFieldModule, MatInput, MatSelect, MatOption, ReactiveFormsModule, NgFor],
  templateUrl: './incidents.component.html',
  styleUrl: './incidents.component.scss'
})
export class IncidentsComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  incident: Incident[] = [];
  pageCurret: any;
  incidentService = inject(IncidentService);
  urlImage= environment.UrlImage;

  ngOnInit(): void {
    this.getIncident();
    
  }
  onPageChange(event: PageEvent) {
this.getIncident(event.pageIndex+1,event.pageSize);
  }
  onFiltro(event:MatSelectChange){
console.log("data:",event)
  }
   onBuscador(event:Event){
 const valor = (event.target as HTMLInputElement).value;

  console.log(valor);
  }

  getIncident(page: number = 1, perPage: number = 10) {
    return this.incidentService.getIncident(page, perPage).subscribe({
      next: (response) => {
        this.incident = response.data.data;
        this.pageCurret = response.data;
        this.incident.forEach((media) => {
         media.media.filter((image)=>{
          console.log("http://localhost:8000/storage/"+image.file_path);
         })
        })
      }, error: (err) => {
        console.error('Error:', err);
      }
    }
    );
  }
  openDialog(): void {

    const dialogRef = this.dialog.open(IncidentCreateComponent, {
      width: '100%',
      maxWidth: '800px',
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
