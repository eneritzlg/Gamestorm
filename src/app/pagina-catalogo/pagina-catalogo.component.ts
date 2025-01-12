import { Component, OnInit } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import { ProductosService } from "../productos.service";
import { Title } from '@angular/platform-browser';
import { Product } from '../../bd/product';
import { CarritoService } from '../carrito.service';

@Component({
  selector: 'app-pagina-catalogo',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './pagina-catalogo.component.html',
  styleUrls: ['./pagina-catalogo.component.css']
})
export class PaginaCatalogoComponent implements OnInit{
  paginaNombre: string = 'GameStorm';

  setTitle() {
    this.titleService.setTitle(`${this.paginaNombre} - Catálogo`);
  }

  products: any[] = [];

  constructor(private productoService: ProductosService, private titleService: Title, private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.products = this.productoService.products;
    this.setTitle();

  }

  addToCart(product: Product) {
    this.carritoService.addToCart(product);

    alert("x1 " + product.nombreProducto + " agregado al carrito correctamente")
  }

  truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;

    const truncatedText = text.slice(0, maxLength);
    const lastSpaceIndex = truncatedText.lastIndexOf(' ');

    if (lastSpaceIndex === -1) return truncatedText;
    return truncatedText.slice(0, lastSpaceIndex) + '...';
  }

  formatPrice(price: number): string {
    return this.productoService.formatPrice(price);
  }
}
