import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';

xdescribe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: {} }
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('hauria de crear-se el guard', () => {
    expect(guard).toBeTruthy();
  });
});
