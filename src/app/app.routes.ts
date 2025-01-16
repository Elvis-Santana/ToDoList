import { Routes } from '@angular/router';
import { ListComponent } from './components/list/lsit/list.component';
import { FormsTaskComponent } from './components/formsTask/forms-task/forms-task.component';

export const routes: Routes = [
  {
    path: "list",
    component: ListComponent,
  },
  {
    path: "form-task",
    component: FormsTaskComponent
  }
];
