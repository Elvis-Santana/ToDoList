import { Component, inject } from '@angular/core';
import { Status } from '../../enum/ststus';
import { FilterTaskService } from '../../services/filter/filter-task.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule

  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  protected filterTaskService = inject(FilterTaskService)

  public select = new FormControl<Status | null>(null);
  protected status = Status;

  constructor() {
    this.select.valueChanges.subscribe(ststus => this.onEventFilter(ststus!))
    this.filterTaskService.resetSelect$.subscribe(() => this.onEventReset())
  }


  public onEventFilter(status: Status) {
    this.filterTaskService.status.set(status)
    this.filterTaskService.eventEmmiterFromFilter()
  }

  public onEventReset = () => {
    this.filterTaskService.eventEmmiterReset();
    this.select.reset();
  }

}
