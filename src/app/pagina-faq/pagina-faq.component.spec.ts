import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaFAQComponent } from './pagina-faq.component';

describe('PaginaFAQComponent', () => {
  let component: PaginaFAQComponent;
  let fixture: ComponentFixture<PaginaFAQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaFAQComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaFAQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
