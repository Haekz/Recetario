import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    const mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: mockRouter }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if user is logged in', () => {
    // Simula que el usuario está autenticado
    spyOn(localStorage, 'getItem').and.returnValue('true'); // Simula que localStorage tiene 'ingresado' como 'true'

    const result = guard.canActivate();

    expect(result).toBeTrue(); // Debe permitir la activación
    expect(router.navigate).not.toHaveBeenCalled(); // No debe haber redirección
  });

  it('should not allow activation and redirect if user is not logged in', () => {
    // Simula que el usuario no está autenticado
    spyOn(localStorage, 'getItem').and.returnValue(null); // Simula que localStorage no tiene 'ingresado'

    const result = guard.canActivate();

    expect(result).toBeFalse(); // Debe no permitir la activación
    expect(router.navigate).toHaveBeenCalledWith(['/inicio']); // Debe redirigir a la página de inicio
  });
});