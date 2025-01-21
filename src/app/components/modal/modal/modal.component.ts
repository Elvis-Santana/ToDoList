import { Component, Inject, inject } from '@angular/core';
import { ModalService } from '../../../services/modal/modal.service';
import { ITask } from '../../../interfaces/task';
import { Status } from '../../../enum/ststus';
import { DatabaseService } from '../../../services/database/database.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  protected data = inject(DatabaseService)

  public modalService = inject(ModalService)
  public open = () => this.modalService.getOpen();
   public task = () => this.modalService.getTask();
  public ststus = Status;

  public renove(id: string) {
    this.data.removerTask(id);
    this.modalService.close();
  }
  public updateStatus(task: ITask, Status: Status) {
    this.data.udapteStatus(task, Status);
    this.modalService.close();

  }





}
