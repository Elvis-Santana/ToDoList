import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatIconModule} from "@angular/material/icon"
import { CardTaskComponent } from './components/cardTask/card-task/card-task.component';
import { Task } from 'zone.js/lib/zone-impl';
import { ITask } from './interfaces/task';
import { FormsTaskComponent } from './components/formsTask/forms-task/forms-task.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    CardTaskComponent,
    FormsTaskComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ToDoList';

  protected  array :ITask[]=[
    {
      id:"1",
      titulo:"Titulo",
      conteudo:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis placeat odio ut pariatur culpa quidem offici adddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
      status:'a fazer'


    },
    {
      id:"2",
      titulo:"Titulo",
      conteudo:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis placeat odio ut pariatur culpa quidem offici adddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
      status:'a fazer'


    },
    {
      id:"3",
      titulo:"Titulo",
      conteudo:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis placeat odio ut pariatur culpa quidem offici adddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
      status:'a fazer'


    },
    {
      id:"4",
      titulo:"Titulo",
      conteudo:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis placeat odio ut pariatur culpa quidem offici adddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
      status:'a fazer'


    }


  ]

  public a (){
    console.log("3")
  }
}
