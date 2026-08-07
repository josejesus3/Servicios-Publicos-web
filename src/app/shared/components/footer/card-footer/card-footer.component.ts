import { Component, Input } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-card-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card-footer.component.html',
  styleUrl: './card-footer.component.scss'
})
export class CardFooterComponent {
  @Input() cardInfo:any[]=[];
  @Input() icon!:string;
   @Input() label!:string;

}
