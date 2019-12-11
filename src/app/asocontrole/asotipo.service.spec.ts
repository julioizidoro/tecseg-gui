import { TestBed } from '@angular/core/testing';

import { AsotipoService } from './asotipo.service';

describe('AsotipoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsotipoService = TestBed.get(AsotipoService);
    expect(service).toBeTruthy();
  });
});
