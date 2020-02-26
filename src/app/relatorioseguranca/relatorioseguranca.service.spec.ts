import { TestBed } from '@angular/core/testing';

import { RelatoriosegurancaService } from './relatorioseguranca.service';

describe('RelatoriosegurancaService', () => {
  let service: RelatoriosegurancaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelatoriosegurancaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
