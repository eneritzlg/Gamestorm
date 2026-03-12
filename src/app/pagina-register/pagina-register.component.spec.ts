import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginaRegisterComponent } from './pagina-register.component';
import { AuthService } from '../auth.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PaginaRegisterComponent', () => {
  let component: PaginaRegisterComponent;
  let fixture: ComponentFixture<PaginaRegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['registerWithEmailAndPassword']);

    await TestBed.configureTestingModule({
      imports: [PaginaRegisterComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: spy },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture = TestBed.createComponent(PaginaRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TEST 1: El Smoke Test
  it('hauria de crear el component', () => {
    expect(component).toBeTruthy();
  });

  // TEST 2: Validació - Formulari buit
  it('el formulari hauria de ser invàlid si està buit', () => {
    component.registerForm.reset();
    expect(component.registerForm.valid).toBeFalsy();
  });

  // TEST 3: Validació - Formulari correcte
  it('el formulari hauria de ser vàlid si s\'omplen els camps obligatoris', () => {
    component.registerForm.controls['nombre'].setValue('Bobby');
    component.registerForm.controls['email'].setValue('bobby@andorra.com');
    component.registerForm.controls['password'].setValue('123456');

    expect(component.registerForm.valid).toBeTruthy();
  });

  // TEST 4: Comunicació amb l'AuthService
  it('hauria de cridar al servei de registre quan s\'envia el formulari vàlid', () => {
    component.registerForm.controls['nombre'].setValue('Bobby');
    component.registerForm.controls['email'].setValue('bobby@andorra.com');
    component.registerForm.controls['password'].setValue('123456');

    component.onSubmit();

    expect(authServiceSpy.registerWithEmailAndPassword).toHaveBeenCalledWith('bobby@andorra.com', '123456');
    expect(authServiceSpy.registerWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});
