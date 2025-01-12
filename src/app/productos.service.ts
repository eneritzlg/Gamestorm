import { Injectable } from '@angular/core';
import { Product } from '../bd/product';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  products: Product[] = [];

  constructor() {
    this.products.push(new Product("spiderman", "Marvel's Spiderman", "https://i.redd.it/wn2jticdpu4b1.png", "Marvel's Spider-Man Remastered para PC es una versión renovada del juego de acción y aventura de 2018. Con una jugabilidad en tercera persona, asumes el personaje del hombre araña, Spider-Man, lidiando con la vida personal de Peter Parker, así como luchando contra el villano superhumano Míster Negativo en su intento de apoderarse de los bajos fondos de Nueva York.", "accion", 60.2, 20, "https://youtu.be/q4GdJVvdxss"));
    this.products.push(new Product("spiderman-2", "Marvel's Spiderman 2", "https://i.redd.it/wn2jticdpu4b1.png", "Marvel's Spider-Man Remastered para PC es una versión renovada del juego de acción y aventura de 2018. Con una jugabilidad en tercera persona, asumes el personaje del hombre araña, Spider-Man, lidiando con la vida personal de Peter Parker, así como luchando contra el villano superhumano Míster Negativo en su intento de apoderarse de los bajos fondos de Nueva York.", "accion", 60.99, 20, "https://youtu.be/q4GdJVvdxss"));
    this.products.push(new Product("spiderman-3", "Marvel's Spiderman 3", "https://i.redd.it/wn2jticdpu4b1.png", "Marvel's Spider-Man Remastered para PC es una versión renovada del juego de acción y aventura de 2018. Con una jugabilidad en tercera persona, asumes el personaje del hombre araña, Spider-Man, lidiando con la vida personal de Peter Parker, así como luchando contra el villano superhumano Míster Negativo en su intento de apoderarse de los bajos fondos de Nueva York.", "accion", 72.69, 20, "https://youtu.be/q4GdJVvdxss", 0.05));
  }

  obtenerProductoPorNombreUrl(idProducto: string) {
    const productoGuardado = localStorage.getItem('producto_' + idProducto);
    if (productoGuardado) {
      return JSON.parse(productoGuardado);
    } else {
      return this.products.find(producto => producto.idProducto === idProducto);
    }
  }

  formatPrice(price: number): string {
    return price.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

}
