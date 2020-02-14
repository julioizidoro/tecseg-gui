import { TestBed } from '@angular/core/testing';

import { EpitipoService } from './epitipo.service';

describe('EpitipoService', () => {
  let service: EpitipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpitipoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
