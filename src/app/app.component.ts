import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from "@angular/material/icon"
import { CardTaskComponent } from './components/cardTask/card-task.component';
import { Task } from 'zone.js/lib/zone-impl';
import { ITask } from './interfaces/task';
import { FormsTaskComponent } from './components/formsTask/forms-task.component';
import { DatabaseService } from './services/database/database.service';
import { CommonModule } from '@angular/common';
import { FilterTaskService } from './services/filter/filter-task.service';
import { Status } from './enum/ststus';
import { ModalComponent } from './components/modal/modal.component';
import { FilterComponent } from './components/filter/filter.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    CommonModule,
    RouterLink,
    ModalComponent,
    FilterComponent,
    FormsTaskComponent

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ToDoList';


}
