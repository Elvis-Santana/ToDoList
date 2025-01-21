import { Component, inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ITask } from '../../../interfaces/task';
import { DatabaseService } from '../../../services/database/database.service';
import { v4 as uuidv4 } from 'uuid';
import { Status } from '../../../enum/ststus';
import { FormsTaskService } from '../../../services/formsTask/forms-task.service';
import { Task } from 'zone.js/lib/zone-impl';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


export interface IFrom {
  conteudo: string,
  titulo: Status
}
@Component({
  selector: 'app-forms-task',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './forms-task.component.html',
  styleUrl: './forms-task.component.scss'
})
export class FormsTaskComponent implements OnDestroy {


  protected data = inject(DatabaseService);
  protected formsTaskService = inject(FormsTaskService);
  protected task: ITask | null = this.formsTaskService.getTaskFromForm();
  protected router = inject(Router);

  protected form = new FormGroup({
    titulo: new FormControl<string>(
      this.task?.titulo ?? ""
    ),
    conteudo: new FormControl<string>(
      this.task?.conteudo ?? ""
    )

  });


  public onEventTask() {

    const task = (this.form.value as ITask);

    if (!task)
      console.error("TASK null ou undefined");


    task.id = uuidv4();
    task.status = Status.aFazer;
    this.data.setOnTask(task);
    this.form.reset();

  }
  public onEventUpdateContent() {

    const updateTask: ITask =
    {
      id: this.task!.id,
      status: this.task!.status,
      ...this.form.value as IFrom,
    }

    this.data.udapteTaskContent(updateTask)
    this.form.reset();
    this.formsTaskService.resetTaskFromForm();
    this.router.navigate(['list'])


  }

  ngOnDestroy(): void {
    this.form.reset();
    this.formsTaskService.resetTaskFromForm();

  }
}
