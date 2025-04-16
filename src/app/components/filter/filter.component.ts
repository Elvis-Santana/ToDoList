import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Status } from '../../enum/ststus';
import { FilterTaskService } from '../../services/filter/filter-task.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { filter, map } from 'rxjs';

@Component({
    selector: 'app-filter',
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './filter.component.html',
    styleUrl: './filter.component.scss'
})
export class FilterComponent {


  protected filterTaskService = inject(FilterTaskService)
  protected select = new FormControl<any>("hidden");
  protected status = Status;

  constructor() {
    this.select.valueChanges
      .subscribe(ststus => {
        if (!ststus)
          this.select.setValue("hidden");

        this.onEventFilter(ststus!)

      })
  }


  public onEventFilter(status: Status) {
    this.filterTaskService.status.set(status);
  }

  public onEventReset = () => {
    this.select.reset();
  }

}
