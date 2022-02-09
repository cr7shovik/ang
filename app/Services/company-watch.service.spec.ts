import { TestBed } from '@angular/core/testing';

import { CompanyWatchService } from './company-watch.service';

describe('CompanyWatchService', () => {
  let service: CompanyWatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyWatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
