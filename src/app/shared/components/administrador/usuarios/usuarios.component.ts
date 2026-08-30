import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatCardContent, MatCardTitle, MatCardHeader, MatCard } from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { UserModel } from '../../../../core/models/user/user.model';
import { MatTooltip } from "@angular/material/tooltip";
import { MatRipple } from "@angular/material/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { FormsModule } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { OpenDialoUserComponent } from './open-dialo-user/open-dialo-user.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MatCardContent, MatCardTitle, MatCardHeader, MatCard, MatFormField, MatLabel, MatInput, MatTooltip, MatRipple, MatPaginator, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

  @Input() users: UserModel[] = [];
  @Input() areas = [];
  @Output() refresh = new EventEmitter();
  @Input() pageCurret: any;
  @Input() loanding: boolean = false;
  @Input() searchDone: boolean = false;
  filter = '';
  readonly openDialog = inject(MatDialog);
  @Output() filterUser = new EventEmitter<string>;
  @Output() pageChange = new EventEmitter<PageEvent>();

  filtro(event: string) {
    this.filterUser.emit(event);
  }

  changePage(event: PageEvent) {
    this.pageChange.emit(event);
  }
  openUsuario(user?:UserModel) {
    const dialogReft = this.openDialog.open(OpenDialoUserComponent, {
      width: '800px',
      maxWidth:'900px',
      maxHeight: '700px',
      height: '670px',
      data:user,
      disableClose: true,
    })

    dialogReft.afterClosed().subscribe(resp=>{
      if(resp){
        this.refresh.emit();
      }
    })
  }
}
