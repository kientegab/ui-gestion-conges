import { TestBed } from '@angular/core/testing';

import { TypeActeService } from './type-acte.service';

describe('TypeActeService', () => {
  let service: TypeActeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeActeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
