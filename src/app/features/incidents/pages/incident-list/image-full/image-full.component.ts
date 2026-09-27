import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-image-full',
  standalone: true,
  imports: [MatIcon, MatButtonModule],
  templateUrl: './image-full.component.html',
  styleUrl: './image-full.component.scss'
})
export class ImageFullComponent {
  img: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ImageFullComponent>) {
    this.img = data;
  }
  cerrar() {
    this.dialogRef.close();
  }


}
