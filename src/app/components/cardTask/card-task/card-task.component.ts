import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DatabaseService } from '../../../services/database/database.service';
import { ITask } from '../../../interfaces/task';
import { Status } from '../../../enum/ststus';
import { NgClass } from '@angular/common';
import { FormsTaskService } from '../../../services/formsTask/forms-task.service';
import { Router } from '@angular/router';
import { ModalService } from '../../../services/modal/modal.service';

@Component({
  selector: 'app-card-task',
  standalone: true,
  imports: [
    MatIconModule,
    NgClass
  ],
  templateUrl: './card-task.component.html',
  styleUrl: './card-task.component.scss'
})
export class CardTaskComponent {

  @Input() task!: ITask;
  protected router = inject(Router);
  protected modalService = inject(ModalService)

  protected formsTaskService = inject(FormsTaskService);

  protected ststus = Status;

  protected isEdit=() => this.modalService.getOpen();

  public editTask() {
    if (!this.isEdit()) {
      this.formsTaskService.setTaskFromForm(this.task);
      this.router.navigate(['form-task']);

    }


  }

  public options() {
    this.modalService.shaw()
    this.modalService.setTask(this.task)


  }
}
