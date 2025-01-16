import { Injectable, signal } from '@angular/core';
import { single } from 'rxjs';
import { ITask } from '../../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  protected open = signal<boolean>(false);
  protected task: ITask | null = null;


  public setTask = (task: ITask) => this.task = task;

  public shaw = () => this.open.set(true)
  public close = () => this.open.set(false)

  public getOpen = () => this.open();
  public getTask = () => this.task;
}
