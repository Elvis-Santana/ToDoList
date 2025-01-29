import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of } from 'rxjs';
import { ITask } from '../../interfaces/task';
import { Status } from '../../enum/ststus';
import { Task } from 'zone.js/lib/zone-impl';
import { stringify } from 'uuid';
import { empty } from 'uuidv4';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  protected key: string = "Task"
  protected database$ = new BehaviorSubject<Array<ITask>>(this.getTask())
  protected aFazer = Array<ITask>();
  protected fazendo = Array<ITask>()
  protected feita = Array<ITask>();
  protected findTasksFromStatus !: ITask;


  constructor() { }


  public setOnTask(task: ITask) {
    const update = [task, ...this.database$.getValue()];

    this.setDatadase(update)

    this.setTask(JSON.stringify(update))
  }

  public getTask() {
    const task = localStorage.getItem(this.key);
    if (task != null)
      return JSON.parse(task)
    return Array<ITask>();
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
    const tasks = [...this.database$.getValue()];

    this.findTasksFromStatus = tasks.find(x => x.id == task.id)!;
    this.findTasksFromStatus.status = ststus;

    this.aFazer = this.sortFromUpdateStatus(task, tasks, Status.aFazer)!;
    this.fazendo = this.sortFromUpdateStatus(task, tasks, Status.fazendo)!;
    this.feita = this.sortFromUpdateStatus(task, tasks, Status.feita)!;


    this.setDatadase([...this.aFazer, ...this.fazendo, ...this.feita]);
    this.setTask(JSON.stringify(this.database$.getValue()))
  }

  sortFromUpdateStatus(taskInput: ITask, arrayInput: ITask[], statusFilter: Status) {
    if (taskInput.status == statusFilter) {
      const index = arrayInput.indexOf(this.findTasksFromStatus);

      if (index !== -1) {
        arrayInput.splice(index, 1);
        return [this.findTasksFromStatus, ...arrayInput.filterFromStatus(statusFilter)];
      }
    }
    return [...arrayInput.filterFromStatus(statusFilter)];

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


  public getTaskByStstus = (status: Status) => this.database$.pipe(
    map((t) =>
      t.filterFromStatus(status)
    )
  )

}

