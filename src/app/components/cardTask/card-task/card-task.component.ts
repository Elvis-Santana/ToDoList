import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-task',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './card-task.component.html',
  styleUrl: './card-task.component.scss'
})
export class CardTaskComponent {

  @Input() titulo!:string;
  @Input() conteudo!:string ;

}
