import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaCondicionesComponent } from './pagina-condiciones.component';

describe('PaginaCondicionesComponent', () => {
  let component: PaginaCondicionesComponent;
  let fixture: ComponentFixture<PaginaCondicionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaCondicionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaCondicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
