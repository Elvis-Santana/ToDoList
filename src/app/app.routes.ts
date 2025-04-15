import { Routes } from '@angular/router';
import { FormsTaskComponent } from './components/formsTask/forms-task.component';
import { ListComponent } from './components/list/list.component';

export const routes: Routes = [

  {
    path:'',
    component:ListComponent
  },
  {
    path: "form-task",
    component: FormsTaskComponent
  }
];
