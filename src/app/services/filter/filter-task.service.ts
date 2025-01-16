import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { Status } from '../../enum/ststus';

@Injectable({
  providedIn: 'root'
})
export class FilterTaskService {

  protected eventSubject = new Subject<Status>();
  protected resetSubject = new Subject<void>();

  public event$ = this.eventSubject.asObservable();
  public reset$ = this.resetSubject.asObservable();

  public status = signal<Status | null>(null)

  public eventEmmiterFromFilter = () => this.eventSubject.next(this.status()!)



  public eventEmmiterReset = () => this.resetSubject.next();





}
