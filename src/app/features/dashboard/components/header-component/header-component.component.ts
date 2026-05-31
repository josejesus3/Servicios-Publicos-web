import { Component } from '@angular/core';
import { CategoryComponentComponent } from "../category-component/category-component.component";

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [CategoryComponentComponent],
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.scss'
})
export class HeaderComponentComponent {

}
