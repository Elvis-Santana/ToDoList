import { TestBed } from '@angular/core/testing';

import { FormsTaskService } from './forms-task.service';

describe('FormsTaskService', () => {
  let service: FormsTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormsTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
