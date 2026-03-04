import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../bd/product';
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  ip = AppComponent.ip;
  apiUrl = `http://${this.ip}:3090/productes`;

  products: Product[] = [];
  newProducts: Product[] = [];

  // Injectem l'HttpClient al constructor
  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  // Aquest mètode truca al Node.js i recull el JSON de Firebase
  cargarProductos() {
    this.http.get<Product[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.products = data;

        // Com que tenies "newProducts", podem simular-ho agafant els últims 3 jocs, per exemple:
        this.newProducts = data.slice(-3);

        console.log("Productes carregats des de la BD:", this.products);
      },
      error: (err) => {
        console.error("Error al carregar els productes des del servidor", err);
      }
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
