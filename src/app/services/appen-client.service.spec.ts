import { TestBed } from '@angular/core/testing';

import { AppenClientService } from './appen-client.service';

describe('AppenClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppenClientService = TestBed.get(AppenClientService);
    expect(service).toBeTruthy();
  });
});
