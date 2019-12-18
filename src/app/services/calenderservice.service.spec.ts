import { TestBed } from '@angular/core/testing';

import { CalenderserviceService } from './calenderservice.service';

describe('CalenderserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalenderserviceService = TestBed.get(CalenderserviceService);
    expect(service).toBeTruthy();
  });
});
