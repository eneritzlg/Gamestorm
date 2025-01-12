import { Injectable } from '@angular/core';
import { Product } from '../bd/product'

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  carrito: Product[] = [];

  constructor() {
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

    console.log(this.carrito);
  }


  clearCart() {
    this.carrito = [];
    localStorage.removeItem('carrito');
  }

  guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  getCart() {
    return this.carrito;
  }
}
