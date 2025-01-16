import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of } from 'rxjs';
import { ITask } from '../../interfaces/task';
import { Status } from '../../enum/ststus';
import { Task } from 'zone.js/lib/zone-impl';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  protected key: string = "Task"
  protected database$ = new BehaviorSubject<Array<ITask>>(this.getTask())



  constructor() { }

  public setOnTask(task: ITask) {
    const update = [...this.database$.getValue(), task];
    this.setDatadase(update)

    this.setTask(JSON.stringify(update))
  }


  public getTask() {
    const task = localStorage.getItem(this.key);
    if (task != null)
      return JSON.parse(task)
    return []
  }

  public removerTask(id: string) {
    const task = this.database$.getValue().filter(x => x.id != id)
    this.setDatadase(task)
    this.setTask(JSON.stringify(task))

  }

  protected setTask = (task: string) => localStorage.setItem(this.key, task);
  protected setDatadase = (task: ITask[]) => this.database$.next(task);
  public obDatabase = () => this.database$.asObservable();



  public udapteStatus(task: ITask, ststus: Status) {
    const tasks = this.database$.getValue();
    const index = tasks.indexOf(task);
    tasks![index].status = ststus;
    this.taskMap(tasks)


  }

  public udapteTaskContent(task: ITask) {
    const tasks = this.database$.getValue();
    const findTasks = tasks.find(x => x.id == task.id)
    const index = tasks.indexOf(findTasks!);
    tasks![index] = task;

    this.taskMap(tasks)

  }

  protected taskMap = (tasks: ITask[]): void[] => tasks.map(t => {
    this.removerTask(t.id);
    this.setOnTask(t);
  })


  public getTaskByStstus = (status:Status) =>
    this.database$.pipe(
      map((t) =>
        t.filterFromStatus(status)
      )
    )

}

