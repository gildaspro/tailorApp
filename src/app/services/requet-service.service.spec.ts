import { TestBed } from '@angular/core/testing';

import { RequetServiceService } from './requet-service.service';

describe('RequetServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequetServiceService = TestBed.get(RequetServiceService);
    expect(service).toBeTruthy();
  });
});
