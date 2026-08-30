import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatCardContent, MatCardHeader, MatCardTitle, MatCard } from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { Area } from '../../../../core/models/area/areaRequest.model';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from "@angular/material/tooltip";
import { MatRipple } from "@angular/material/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { FormsModule } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { OpenDialogAreasComponent } from './open-dialog-areas/open-dialog-areas.component';

@Component({
  selector: 'app-areas',
  standalone: true,
  imports: [MatCardContent, MatCardHeader, MatCardTitle, MatCard, MatFormField, MatLabel, MatInput, MatTooltip, MatRipple, MatPaginator, FormsModule],
  templateUrl: './areas.component.html',
  styleUrl: './areas.component.scss'
})
export class AreasComponent {

  @Input() areas: Area[] = [];
  @Input() pageCurret: any;
  @Input() loanding: boolean = false;
  @Input() searchDone: boolean = false;
  filter = '';
  @Output() refresh=new EventEmitter();
  readonly openDialog = inject(MatDialog);
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() filterArea = new EventEmitter<string>();
constructor(){
  console.log('Areas:',this.areas);
}
  filtro(event: string) {
    this.filterArea.emit(event);
  }

  changePage(event: PageEvent) {
    this.pageChange.emit(event);
  }

  openArea(area?:Area) {
    const dialogReft=this.openDialog.open(OpenDialogAreasComponent, {
      width: '800px',
      maxWidth: '900px',
      maxHeight: '700px',
      height: '570px',
      data:area,
      disableClose: true,

    })
    dialogReft.afterClosed().subscribe(resp=>{
      if(resp){
        this.refresh.emit();
      }
    })
  }

  

}
