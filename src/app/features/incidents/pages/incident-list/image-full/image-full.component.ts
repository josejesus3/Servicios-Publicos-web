import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogClose, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-image-full',
  standalone: true,
  imports: [MatIcon, MatDialogClose, MatDialogActions, MatButtonModule, MatDialogContent],
  templateUrl: './image-full.component.html',
  styleUrl: './image-full.component.scss'
})
export class ImageFullComponent {
  img: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ImageFullComponent>) {
    this.img = data;
    console.log(this.img);
  }
  cerrar() {
    this.dialogRef.close();
  }


}
