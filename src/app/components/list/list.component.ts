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

  protected dataAfazer = Array<ITask>();
  protected dataFazendo = Array<ITask>();
  protected dataFeito = Array<ITask>();
  protected status = () => this.filterTaskService.status();

  protected data$ = this.database.obDatabase();

  constructor() {

    this.loadData();
    this.filterTaskService.event$.subscribe(() =>
      this.filter(this.filterTaskService.status()!)
    )
    this.filterTaskService.reset$.subscribe(() => {
      this.loadData()
    })

  }



  public filter(status: Status) {

    this.database.getTaskByStstus(status).subscribe(tasks => {
      switch (status) {
        case Status.aFazer:
          this.dataAfazer = tasks;
          this.dataFazendo.empty();
          this.dataFeito.empty();
          break;

        case Status.fazendo:
          this.dataFazendo = tasks;
          this.dataAfazer.empty();
          this.dataFeito.empty();
          break;

        case Status.feita:
          this.dataFeito = tasks;
          this.dataFazendo.empty();
          this.dataAfazer.empty();
          break;
      }
    })

  }

  public loadData() {
    this.dataAfazer.empty();
    this.dataFazendo.empty();
    this.dataFeito.empty();
    this.data$.subscribe(tasks => {

      this.dataAfazer = tasks.filterFromStatus(Status.aFazer);
      this.dataFazendo = tasks.filterFromStatus(Status.fazendo);
      this.dataFeito = tasks.filterFromStatus(Status.feita);

    });
  }


  ngOnDestroy(): void {
    this.filterTaskService.eventEmmiterResetSelect();
  }
}
