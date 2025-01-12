import { Component, OnInit } from '@angular/core';
import {NgIf} from "@angular/common";
import {ActivatedRoute} from '@angular/router';
import { ProductosService } from "../productos.service";

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  product: any;

  constructor(private productoService: ProductosService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idProducto = params.get('idProducto');
      if (idProducto) {
        this.product = this.productoService.obtenerProductoPorNombreUrl(idProducto);
      } else {
        console.error('URL del producto no válida');
      }
    });
  }

  formatPrice(price: number): string {
    return this.productoService.formatPrice(price);
  }

  randomNumber(): number {
    let max = 9999;
    return Math.floor(Math.random() * max);
  }
}
