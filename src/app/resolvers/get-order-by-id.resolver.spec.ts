import { TestBed } from '@angular/core/testing';

import { GetOrderByIdResolver } from './get-order-by-id.resolver';

describe('GetOrderByIdResolver', () => {
  let resolver: GetOrderByIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GetOrderByIdResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
