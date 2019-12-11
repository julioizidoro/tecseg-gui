import { TestBed } from '@angular/core/testing';

import { AsocontroleService } from './asocontrole.service';

describe('AsocontroleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsocontroleService = TestBed.get(AsocontroleService);
    expect(service).toBeTruthy();
  });
});
