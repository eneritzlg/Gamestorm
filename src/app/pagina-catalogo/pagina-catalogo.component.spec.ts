import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaCatalogoComponent } from './pagina-catalogo.component';

describe('PaginaCatalogoComponent', () => {
  let component: PaginaCatalogoComponent;
  let fixture: ComponentFixture<PaginaCatalogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaCatalogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
