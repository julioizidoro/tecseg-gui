import { TestBed } from '@angular/core/testing';

import { AsoagendaService } from './asoagenda.service';

describe('AsoagendaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsoagendaService = TestBed.get(AsoagendaService);
    expect(service).toBeTruthy();
  });
});
