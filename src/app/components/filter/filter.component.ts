import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Status } from '../../enum/ststus';
import { FilterTaskService } from '../../services/filter/filter-task.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { filter, map } from 'rxjs';

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
  public select = new FormControl<any>("hidden");
  protected status = Status;

  constructor() {
    this.select.valueChanges
      .subscribe(ststus => {
        if (!ststus)
          this.select.setValue("hidden");

        this.onEventFilter(ststus!)

      })
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
