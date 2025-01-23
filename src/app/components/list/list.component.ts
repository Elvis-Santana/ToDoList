import { CommonModule, NgClass } from '@angular/common';
import { Component, ElementRef, inject, OnDestroy, OnInit, Query, QueryList, Renderer2, ViewChild, viewChild, ViewChildren } from '@angular/core';
import { Status } from '../../enum/ststus';
import { ITask } from '../../interfaces/task';
import { DatabaseService } from '../../services/database/database.service';
import { FilterTaskService } from '../../services/filter/filter-task.service';
import { CardTaskComponent } from '../cardTask/card-task.component';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    CardTaskComponent,
    NgClass
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnDestroy {
  protected database = inject(DatabaseService);
  protected filterTaskService = inject(FilterTaskService);



  protected dataAfazer: ITask[] = []
  protected dataFazendo: ITask[] = []
  protected dataFeito: ITask[] = []
  protected status = () => this.filterTaskService.status();

  protected data$ = this.database.obDatabase();



  constructor() {

    this.loadData();
    this.filterTaskService.event$.subscribe(() =>
      this.filter(this.filterTaskService.status()!)
    )
    this.filterTaskService.reset$.subscribe(() => {
      this.loadData()
      console.log(this.status);
    })

  }



  public filter(status: Status) {

    this.database.getTaskByStstus(status).subscribe(tasks => {
      switch (status) {
        case Status.aFazer:
          this.dataAfazer = tasks.order();
          this.dataFazendo = []
          this.dataFeito = []
          break;

        case Status.fazendo:
          this.dataFazendo =  tasks.order();
          this.dataAfazer = []
          this.dataFeito = []
          break;

        case Status.feita:
          this.dataFeito =  tasks.order();
          this.dataFazendo = []
          this.dataAfazer = []
          break;
      }
    })

  }

  public loadData() {
    this.dataAfazer = []
    this.dataFazendo = []
    this.dataFeito = []
    this.data$.subscribe(tasks => {
      
      this.dataAfazer = tasks.filterFromStatus(Status.aFazer).order();
      this.dataFazendo = tasks.filterFromStatus(Status.fazendo).order()
      this.dataFeito = tasks.filterFromStatus(Status.feita).order();

    });
  }


  ngOnDestroy(): void {
    this.filterTaskService.eventEmmiterResetSelect();
  }
}
