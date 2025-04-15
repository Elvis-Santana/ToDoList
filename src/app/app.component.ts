import { AfterViewInit, Component, effect, ElementRef, inject, OnInit, signal, ViewChild, viewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet ,ActivatedRoute} from '@angular/router';
import { MatIconModule } from "@angular/material/icon"

import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { FilterComponent } from './components/filter/filter.component';
import { debounceTime,  fromEvent } from 'rxjs';

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
    MatIconModule

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit  {


  title = 'ToDoList';
  @ViewChild('arrow_back') protected arrow_back !: ElementRef;
  protected route = signal<string>("");
 

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
