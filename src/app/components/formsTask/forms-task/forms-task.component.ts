import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forms-task',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './forms-task.component.html',
  styleUrl: './forms-task.component.scss'
})
export class FormsTaskComponent {

  protected from = new FormGroup({
    titulo: new FormControl<string>(""),
    conteudo: new FormControl<string>("")
  });

  
}
