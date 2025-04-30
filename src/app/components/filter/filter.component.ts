import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Status } from '../../shared/enum/status';
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
export class FilterComponent implements OnInit {


  protected filterTaskService = inject(FilterTaskService)
  protected select = new FormControl<any>("hidden");
  protected status = Status;


  ngOnInit(): void {
    this.select.valueChanges
      .subscribe(ststus => {
        if (!ststus)
          this.select.setValue("hidden");

        this.onEventFilter(ststus!)

      });
  }


  public onEventFilter(status: Status) {
    this.filterTaskService.status.set(status);
  }

  public onEventReset = () => {
    this.select.reset();
  }

}
