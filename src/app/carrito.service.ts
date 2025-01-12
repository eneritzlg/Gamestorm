import { Injectable } from '@angular/core';
import { Product } from '../bd/product'

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  carrito: Product[] = [];

  constructor() { }


  addToCart(producto: Product) {
    const productoExistente = this.carrito.find(p => p.idProducto === producto.idProducto);
    if (productoExistente) {
      productoExistente.cantidadCarrito++;
    } else {
      producto.cantidadCarrito = 1;
      this.carrito.push(producto);
    }

    console.log(this.carrito);

  }
}
