import { TestBed } from '@angular/core/testing';

import { NgNiruchartService } from './ng-niruchart.service';

describe('NgNiruchartService', () => {
  let service: NgNiruchartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgNiruchartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
