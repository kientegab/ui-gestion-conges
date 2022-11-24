import { TestBed } from '@angular/core/testing';

import { ImportedService } from './imported.service';

describe('ImportedService', () => {
  let service: ImportedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
