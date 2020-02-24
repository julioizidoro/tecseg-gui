import { TestBed } from '@angular/core/testing';

import { ClinicapagtoService } from './clinicapagto.service';

describe('ClinicapagtoService', () => {
  let service: ClinicapagtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClinicapagtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
