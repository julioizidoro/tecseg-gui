import { TestBed } from '@angular/core/testing';

import { ProdutogrupoService } from './produtogrupo.service';

describe('ProdutogrupoService', () => {
  let service: ProdutogrupoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutogrupoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
