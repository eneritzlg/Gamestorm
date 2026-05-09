import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Product } from '../bd/product';
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private http = inject(HttpClient);
  private apiUrl = `http://${AppComponent.ip}:3090`;

  carrito: Product[] = [];

  constructor() {
    this.cargarCarritoDesdeLocalStorage();
  }

  private cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carrito = JSON.parse(carritoGuardado);
    }
  }

  addToCart(producto: Product) {
    const productoExistente = this.carrito.find(p => p.idProducto === producto.idProducto);
    if (productoExistente) {
      productoExistente.cantidadCarrito++;
    } else {
      producto.cantidadCarrito = 1;
      this.carrito.push(producto);
    }
    this.guardarCarritoEnLocalStorage();
  }

  removeFromCart(idProducto: string) {
    this.carrito = this.carrito.filter(p => p.idProducto !== idProducto);
    this.guardarCarritoEnLocalStorage();
  }

  clearCart() {
    this.carrito = [];
    localStorage.removeItem('carrito');
  }

  guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  getCart(): Product[] {
    return this.carrito;
  }

  getTotalItems(): number {
    return this.carrito.reduce((acc, p) => acc + p.cantidadCarrito, 0);
  }

  getTotalPreu(): number {
    return this.carrito.reduce((acc, p) => {
      const preu = p.porcentajeDescuentoProducto
        ? p.precioProducto * (1 - p.porcentajeDescuentoProducto / 100)
        : p.precioProducto;
      return acc + preu * p.cantidadCarrito;
    }, 0);
  }

  async finalizarCompra(email: string): Promise<void> {
    if (this.carrito.length === 0) throw new Error('El carrito está vacío');

    const productes = this.carrito.map(p => ({
      idProducto: p.idProducto,
      nombreProducto: p.nombreProducto,
      quantitat: p.cantidadCarrito,
      preu_unitari: p.precioProducto,
      en_oferta: !!p.porcentajeDescuentoProducto
    }));

    await firstValueFrom(
      this.http.post(`${this.apiUrl}/compra`, { email, productes })
    );

    this.clearCart();
  }

  async guardarCistella(email: string): Promise<void> {
    try {
      await firstValueFrom(
        this.http.post(`${this.apiUrl}/cistella/guardar`, {
          email,
          productes: this.carrito
        })
      );
    } catch (error) {
      console.error('Error guardant cistella:', error);
    }
  }

  async recuperarCistella(email: string): Promise<void> {
    try {
      const productes = await firstValueFrom(
        this.http.get<Product[]>(`${this.apiUrl}/cistella/${email}`)
      );
      if (productes && productes.length > 0) {
        this.carrito = productes;
        this.guardarCarritoEnLocalStorage();
      }
    } catch (error) {
      console.error('Error recuperant cistella:', error);
    }
  }
}