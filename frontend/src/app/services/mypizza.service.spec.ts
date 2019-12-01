import { TestBed } from '@angular/core/testing';

import { MypizzaService } from './mypizza.service';

describe('MypizzaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MypizzaService = TestBed.get(MypizzaService);
    expect(service).toBeTruthy();
  });
});
