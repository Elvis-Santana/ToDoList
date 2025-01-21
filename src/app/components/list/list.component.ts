import { CommonModule, NgClass } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { Status } from '../../enum/ststus';
import { ITask } from '../../interfaces/task';
import { DatabaseService } from '../../services/database/database.service';
import { FilterTaskService } from '../../services/filter/filter-task.service';
import { CardTaskComponent } from '../cardTask/card-task/card-task.component';


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
  protected status: Status | null = null;

  protected data$ = this.database.obDatabase();



  constructor() {
    this.filterTaskService.eventEmmiterResetSelect();
    this.loadData();
    this.filterTaskService.event$.subscribe(() =>
      this.filter(this.filterTaskService.status()!)
    )
    this.filterTaskService.reset$.subscribe(() => this.loadData())

  }


  public filter(status: Status) {
    this.database.getTaskByStstus(status).subscribe(tasks => {
      switch (status) {
        case Status.aFazer:
          this.status = Status.aFazer;
          this.dataAfazer = tasks;
          this.dataFazendo = []
          this.dataFeito = []
          break;

        case Status.fazendo:
          this.status = Status.fazendo;

          this.dataFazendo = tasks
          this.dataAfazer = []
          this.dataFeito = []
          break;

        case Status.feita:
          this.status = Status.feita;

          this.dataFeito = tasks
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
    this.status = null;

    this.data$.subscribe(tasks => {
      this.dataAfazer = tasks.filterFromStatus(Status.aFazer)
      this.dataFazendo = tasks.filterFromStatus(Status.fazendo)
      this.dataFeito = tasks.filterFromStatus(Status.feita)

    });
  }


  ngOnDestroy(): void {
    this.filterTaskService.eventEmmiterResetSelect();
  }
}
