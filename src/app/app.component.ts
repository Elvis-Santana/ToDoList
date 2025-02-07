import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild, viewChild } from '@angular/core';
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
import { debounceTime, from, fromEvent } from 'rxjs';

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
    FormsTaskComponent,
    MatIconModule

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {


  title = 'ToDoList';

  @ViewChild('arrow_back') protected arrow_back !: ElementRef;

  ngAfterViewInit(): void {
    const element = this.arrow_back.nativeElement as HTMLLIElement;

    const click = fromEvent(element, 'click');

    click.subscribe(_ => element.classList.add("start-anim-arrow_moviment"))
    click.pipe(
      debounceTime(300)
    ).subscribe(_ =>
      element.classList.remove("start-anim-arrow_moviment")
    )

  }


}
