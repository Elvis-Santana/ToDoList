import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Status } from './app/enum/ststus';
import { ITask } from './app/interfaces/task';


Array.prototype.filterFromStatus = function (ststus: Status) {
  return this.filter((x: ITask) => x.status == ststus)
}

Array.prototype.order = function () {
  const array = this.map(x => x);
  const newArray: ITask[] = [];

  for (let i = array.length - 1; i >= 0; i--) {
    const element = array[i];
    newArray.push(element);
  }

  return newArray;
}

Array.prototype.empty = function() {
  return [];
}

declare global {
  interface Array<T> {
    filterFromStatus(ststus: Status): T[];
  }
}

declare global {
  interface Array<T> {
    order(): T[]
  }
}
declare global {
  interface Array<T> {
    empty(): T[]
  }
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
