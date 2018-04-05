import {TestBed, inject} from '@angular/core/testing';

import {ShopOwnerGuard} from './shop-owner.guard';

describe('ShopOwnerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopOwnerGuard]
    });
  });

  it('should ...', inject([ShopOwnerGuard], (guard: ShopOwnerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
