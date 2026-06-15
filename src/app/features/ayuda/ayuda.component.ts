import { Component } from '@angular/core';
import { AyudaCardComponent } from "./ayuda-card/ayuda-card.component";
import { FormListComponent } from "./form-list/form-list.component";

@Component({
  selector: 'app-ayuda',
  standalone: true,
  imports: [AyudaCardComponent, FormListComponent],
  templateUrl: './ayuda.component.html',
  styleUrl: './ayuda.component.scss'
})
export class AyudaComponent {
activeButton=1;
onActiveAyuda(id:number){
  this.activeButton=id;
}


}
