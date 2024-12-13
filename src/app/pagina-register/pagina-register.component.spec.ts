import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaRegisterComponent } from './pagina-register.component';

describe('PaginaRegisterComponent', () => {
  let component: PaginaRegisterComponent;
  let fixture: ComponentFixture<PaginaRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
