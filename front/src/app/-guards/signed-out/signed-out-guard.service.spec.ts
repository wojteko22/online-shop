import {TestBed, inject} from '@angular/core/testing';

import {SignedOutGuard} from './signed-out-guard.service';

describe('SignedOutGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignedOutGuard]
    });
  });

  it('should be created', inject([SignedOutGuard], (service: SignedOutGuard) => {
    expect(service).toBeTruthy();
  }));
});
