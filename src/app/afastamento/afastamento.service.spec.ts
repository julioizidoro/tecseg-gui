import { TestBed } from '@angular/core/testing';

import { AfastamentoService } from './afastamento.service';

describe('AfastamentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AfastamentoService = TestBed.get(AfastamentoService);
    expect(service).toBeTruthy();
  });
});
