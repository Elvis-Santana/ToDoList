import { Routes } from '@angular/router';
import { FormsTaskComponent } from './components/formsTask/forms-task/forms-task.component';
import { ListComponent } from './components/list/list.component';

export const routes: Routes = [
  {
    path: "list",
    component: ListComponent,
  },
  {
    path: "form-task",
    component: FormsTaskComponent
  },
  {
    path:'',
    component:ListComponent
  }
];
