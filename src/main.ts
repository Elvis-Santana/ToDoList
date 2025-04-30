import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Status } from './app/shared/enum/status';
import { ITask } from './app/interfaces/task';
import './app/utils/extensions';






bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
