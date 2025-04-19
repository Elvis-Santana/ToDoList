import { EventEmitter, Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { Status } from '../../shared/enum/status';

@Injectable({
  providedIn: 'root'
})
export class FilterTaskService {
  public status = signal<Status | null>(null)









}
