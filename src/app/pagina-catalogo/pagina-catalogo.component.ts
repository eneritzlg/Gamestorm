import { Component, OnInit } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import { ProductosService } from "../productos.service";

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

  products: any[] = [];

  constructor(private productoService: ProductosService) {}

  ngOnInit(): void {
    this.products = this.productoService.products;
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
