import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-ayuda-card',
  standalone: true,
  imports: [],
  templateUrl: './ayuda-card.component.html',
  styleUrl: './ayuda-card.component.scss'
})
export class AyudaCardComponent {
  @Output() activeAyuda=new EventEmitter<number>();
  activeButton=1;

  buttons = [
  {
    id: 1,
    label: 'General',
    icon: 'bi bi-gear',
    disabled: false
  },
  {
    id: 2,
    label: 'Reportes',
    icon: 'bi bi-file-earmark-bar-graph',
    disabled: false
  },
  {
    id: 3,
    label: 'Cuenta',
    icon: 'bi bi-person',
    disabled: false
  },
  {
    id: 4,
    label: 'Privacidad',
    icon: 'bi bi-shield-lock',
    disabled: false
  }
];
isActive(button:number){
  this.activeButton=button
  this.activeAyuda.emit(button);
  

}


}
