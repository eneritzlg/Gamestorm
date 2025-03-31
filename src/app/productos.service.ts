import { Injectable } from '@angular/core';
import { Product } from '../bd/product';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  products: Product[] = [];
  newProducts: Product[] = [];

  constructor() {
    this.products.push(new Product("spiderman", "Marvel's Spiderman", "https://i.redd.it/wn2jticdpu4b1.png", "Marvel's Spider-Man Remastered para PC es una versión renovada del juego de acción y aventura de 2018. Con una jugabilidad en tercera persona, asumes el personaje del hombre araña, Spider-Man, lidiando con la vida personal de Peter Parker, así como luchando contra el villano superhumano Míster Negativo en su intento de apoderarse de los bajos fondos de Nueva York.", "accion", 60.2, 20, "https://www.youtube.com/embed/mrT5q5xXb7Y?si=LNZseJLf3CJbap1m"));
    this.products.push(new Product("spiderman-2", "Marvel's Spiderman 2", "https://i.redd.it/wn2jticdpu4b1.png", "Marvel's Spider-Man Remastered para PC es una versión renovada del juego de acción y aventura de 2018. Con una jugabilidad en tercera persona, asumes el personaje del hombre araña, Spider-Man, lidiando con la vida personal de Peter Parker, así como luchando contra el villano superhumano Míster Negativo en su intento de apoderarse de los bajos fondos de Nueva York.", "accion", 60.99, 20, "https://www.youtube.com/embed/mrT5q5xXb7Y?si=LNZseJLf3CJbap1m"));
    this.products.push(new Product("spiderman-3", "Marvel's Spiderman 3", "https://i.redd.it/wn2jticdpu4b1.png", "Marvel's Spider-Man Remastered para PC es una versión renovada del juego de acción y aventura de 2018. Con una jugabilidad en tercera persona, asumes el personaje del hombre araña, Spider-Man, lidiando con la vida personal de Peter Parker, así como luchando contra el villano superhumano Míster Negativo en su intento de apoderarse de los bajos fondos de Nueva York.", "accion", 72.69, 20, "https://www.youtube.com/embed/mrT5q5xXb7Y?si=LNZseJLf3CJbap1m", 0.05));

    this.newProducts.push(new Product("blasphemous", "Blasphemous", "http://192.168.19.158:3090/img/blasphemous.jpg", "Una terrible maldición conocida como el Milagro ha caído sobre la tierra de Cvstodia y sus habitantes. Eres el Penitente, el único superviviente de la masacre de la hermandad del Lamento Mudo. Estás atrapado en un ciclo de penitencia de muerte y resurrección constante, y solo tú puedes librar al mundo de este destino tan terrible y llegar al origen de tu angustia.", "aventura", 25.45, 15, "https://www.youtube.com/embed/seGW4vdfL7A?si=CaeazhCNM9QwbDOe"))
    this.newProducts.push(new Product("street-fighter-6", "Street Figther 6", "http://192.168.19.158:3090/img/sf6.jpg", "¡Aquí llega el peso pesado de Capcom! Street Fighter™ 6 sale a la venta en todo el mundo el 2 de junio de 2023, y trae consigo una nueva evolución de la saga Street Fighter™. Street Fighter 6 hace gala de la potencia del RE ENGINE de Capcom, e incluye tres modos de juego: World Tour, Fighting Ground y Battle Hub.", "pelea", 13.45, 15, "https://www.youtube.com/embed/1INU3FOJsTw?si=RyNrGMlguRBUZjCO"))
    this.newProducts.push(new Product("lethal-company", "Lethal Company", "http://192.168.19.158:3090/img/lethal.jpg", "Eres un trabajador contratado por la Empresa. Su trabajo consiste en recolectar chatarra de lunas industrializadas abandonadas para cumplir con la cuota de ganancias de la Compañía. Puedes usar el dinero que ganes para viajar a lunas nuevas con mayores riesgos y recompensas, o puedes comprar trajes elegantes y decoraciones para tu barco.", "terror", 25.45, 15, "https://www.youtube.com/embed/Su6OsTb1w9Q?si=9dfYoKajvxtVWlcr"))

    this.newProducts.forEach(product => {
      this.products.push(product);
    });

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
