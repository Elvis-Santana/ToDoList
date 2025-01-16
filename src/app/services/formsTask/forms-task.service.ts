import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITask } from '../../interfaces/task';
import { Status } from '../../enum/ststus';

@Injectable({
  providedIn: 'root'
})
export class FormsTaskService {

  protected task$ = new BehaviorSubject<ITask | null>(null);
  constructor() { }

  public getTaskFromForm = (): ITask | null => this.task$.getValue();

  public setTaskFromForm = (task: ITask): void => this.task$.next(task)
  public resetTaskFromForm = (): void => this.task$.next(null)

}
