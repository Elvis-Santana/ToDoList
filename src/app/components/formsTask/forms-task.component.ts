import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ITask } from '../../interfaces/task';
import { DatabaseService } from '../../services/database/database.service';
import { v4 as uuidv4 } from 'uuid';
import { Status } from '../../shared/enum/status';
import { FormsTaskService } from '../../services/formsTask/forms-task.service';
import { Task } from 'zone.js/lib/zone-impl';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


export interface IFrom {
  conteudo: string,
  titulo: Status
}
@Component({
    selector: 'app-forms-task',
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    templateUrl: './forms-task.component.html',
    styleUrl: './forms-task.component.scss'
})
export class FormsTaskComponent implements OnDestroy {


  protected data = inject(DatabaseService);
  protected formsTaskService = inject(FormsTaskService);
  protected task: ITask | null = this.formsTaskService.getTaskFromForm();
  protected router = inject(Router);

  public form = new FormGroup({
    titulo: new FormControl<string>(this.task?.titulo ?? ""),
    conteudo: new FormControl<string>(this.task?.conteudo ?? "")

  });

  public onEventTask() {

    const task = this.createdTaskRetrun();
    if (!task)
      console.error("TASK null ou undefined");
    this.data.setOnTask(task);
    this.form.reset();

  }
  private createdTaskRetrun() {
    const task = (this.form.value as ITask);
    task.id = uuidv4();
    task.status = Status.aFazer;
    return task;
  }

  public onEventUpdateContent() {
    const updateTask: ITask =this.taskUpdateReturn();
    this.data.udapteTaskContent(updateTask)
    this.form.reset();
    this.formsTaskService.resetTaskFromForm();
    this.router.navigate([''])
  }

  private taskUpdateReturn(): ITask {
    return {
      id: this.task!.id,
      status: this.task!.status,
      ...this.form.value as IFrom,
    };
  }

  ngOnDestroy(): void {
    this.form.reset();
    this.formsTaskService.resetTaskFromForm();

  }
}
