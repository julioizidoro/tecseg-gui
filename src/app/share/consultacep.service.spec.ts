import { TestBed } from '@angular/core/testing';

import { ConsultacepService } from './consultacep.service';

describe('ConsultacepService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultacepService = TestBed.get(ConsultacepService);
    expect(service).toBeTruthy();
  });
});
