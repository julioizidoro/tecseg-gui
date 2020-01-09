import { TestBed } from '@angular/core/testing';

import { AlertModelService } from './alert-model.service';

describe('AlertModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlertModelService = TestBed.get(AlertModelService);
    expect(service).toBeTruthy();
  });
});
