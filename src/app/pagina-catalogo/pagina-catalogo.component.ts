import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { ProductosService } from "../productos.service";
import { Title } from '@angular/platform-browser';
import { Product } from '../../bd/product';
import { CarritoService } from '../carrito.service';
import { AppComponent } from '../app.component'; // Importem AppComponent per la IP

@Component({
  selector: 'app-pagina-catalogo',
  standalone: true,
  imports: [ NgForOf, NgIf ],
  templateUrl: './pagina-catalogo.component.html',
  styleUrls: ['./pagina-catalogo.component.css']
})
export class PaginaCatalogoComponent implements OnInit {
  paginaNombre: string = 'GameStorm';
  ip = AppComponent.ip; // Fem disponible la IP al catàleg

  constructor(
    private productoService: ProductosService,
    private titleService: Title,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.setTitle();
  }

  setTitle() {
    this.titleService.setTitle(`${this.paginaNombre} - Catálogo`);
  }

  // Getter per obtenir els productes del servei de forma asíncrona
  get products(): Product[] {
    return this.productoService.products;
  }

  addToCart(product: Product) {
    this.carritoService.addToCart(product);
    alert("x1 " + product.nombreProducto + " agregado al carrito correctamente");
  }

  truncateText(text: string, maxLength: number): string {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    const truncatedText = text.slice(0, maxLength);
    const lastSpaceIndex = truncatedText.lastIndexOf(' ');
    return lastSpaceIndex === -1 ? truncatedText : truncatedText.slice(0, lastSpaceIndex) + '...';
  }

  formatPrice(price: number): string {
    return this.productoService.formatPrice(price);
  }
}
