import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Status } from './app/enum/ststus';
import { ITask } from './app/interfaces/task';


Array.prototype.filterFromStatus = function (ststus: Status) {
  return this.filter((x:ITask )=>  x.status == ststus)
};
declare global {
  interface Array<T> {
    filterFromStatus(ststus: Status): T[];
  }
}


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
