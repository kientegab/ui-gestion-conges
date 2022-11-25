import { TestBed } from '@angular/core/testing';

import { AmpliationService } from './ampliation.service';

describe('AmpliationService', () => {
  let service: AmpliationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmpliationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
