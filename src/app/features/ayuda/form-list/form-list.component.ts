import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { PreguntasServices } from '../services/preguntas.service';
import { FromGrup, FromItem } from '../models/preguntas.models';


@Component({
  selector: 'app-form-list',
  standalone: true,
  imports: [MatExpansionModule],
  templateUrl: './form-list.component.html',
  styleUrl: './form-list.component.scss'
})
export class FormListComponent implements OnInit, OnChanges {
  selectFromGrup: FromItem[] = [];
  @Input() activeButtos = 1;

  private preguntasSer = inject(PreguntasServices);

  ngOnInit(): void {
    this.getPreguntas();

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeButtos']) {
      this.getPreguntas();
    }
  }

  getPreguntas() {
    this.preguntasSer.getFrom().subscribe(data => {
      const grupo = data.find(
        item => item.id === this.activeButtos
      );
      this.selectFromGrup = grupo?.preguntas ?? [];
    });
  }

}
