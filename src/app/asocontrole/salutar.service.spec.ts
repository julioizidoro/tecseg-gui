import { TestBed } from '@angular/core/testing';

import { SalutarService } from './salutar.service';

describe('SalutarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalutarService = TestBed.get(SalutarService);
    expect(service).toBeTruthy();
  });
});
