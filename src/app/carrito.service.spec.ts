import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CarritoService } from './carrito.service';
import { Product } from '../bd/product';

describe('CarritoService', () => {
  let service: CarritoService;
  let httpMock: HttpTestingController;

  const mockProduct: Product = {
    idProducto: '1',
    nombreProducto: 'Joc de Prova',
    precioProducto: 50,
    cantidadCarrito: 0,
    imagen: '',
    descripcionProducto: '',
    categoriaProducto: '',
    stockProducto: 10,
    video: ''
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CarritoService]
    });
    service = TestBed.inject(CarritoService);
    httpMock = TestBed.inject(HttpTestingController);
    
    // Netegem el localStorage abans de cada test
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('hauria de crear-se el servei', () => {
    expect(service).toBeTruthy();
  });

  it('hauria d\'afegir un producte a la cistella', () => {
    service.addToCart({ ...mockProduct });
    expect(service.getCart().length).toBe(1);
    expect(service.getCart()[0].idProducto).toBe('1');
    expect(service.getTotalItems()).toBe(1);
  });

  it('hauria d\'incrementar la quantitat si el producte ja existeix', () => {
    service.addToCart({ ...mockProduct });
    service.addToCart({ ...mockProduct });
    expect(service.getCart().length).toBe(1);
    expect(service.getCart()[0].cantidadCarrito).toBe(2);
    expect(service.getTotalItems()).toBe(2);
  });

  it('hauria de calcular correctament el preu total', () => {
    const producte2 = { ...mockProduct, idProducto: '2', precioProducto: 100 };
    service.addToCart({ ...mockProduct }); // 50
    service.addToCart(producte2);          // 100
    expect(service.getTotalPreu()).toBe(150);
  });

  it('hauria d\'aplicar el descompte en el preu total', () => {
    const producteOferta = { ...mockProduct, precioProducto: 100, porcentajeDescuentoProducto: 20 };
    service.addToCart(producteOferta); // 100 - 20% = 80
    expect(service.getTotalPreu()).toBe(80);
  });

  it('hauria d\'eliminar un producte de la cistella', () => {
    service.addToCart({ ...mockProduct });
    service.removeFromCart('1');
    expect(service.getCart().length).toBe(0);
  });

  it('hauria de buidar la cistella', () => {
    service.addToCart({ ...mockProduct });
    service.clearCart();
    expect(service.getCart().length).toBe(0);
    expect(localStorage.getItem('carrito')).toBeNull();
  });
});
