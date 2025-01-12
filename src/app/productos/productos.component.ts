import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { NgIf } from "@angular/common";
import { ProductosService } from "../productos.service";
import { CarritoService } from "../carrito.service";
import { SafeUrlPipe } from "../safe-url.pipe";
import { Product } from "../../bd/product"

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    SafeUrlPipe,
    NgIf
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  product: any;
  addedCorrectly = false;

  constructor(private productoService: ProductosService, public carritoService: CarritoService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idProducto = params.get('idProducto');
      if (idProducto) {
        this.product = this.productoService.obtenerProductoPorNombreUrl(idProducto);
      } else {
        console.error('URL del producto no válida');
      }
    });

    console.log(this.product.videoProducto)
  }

  addToCart(product: Product) {
    this.carritoService.addToCart(product);

    this.addedCorrectly = true;
    setTimeout(() => {
      this.addedCorrectly = false;
    }, 5000);
  }

  formatPrice(price: number): string {
    return this.productoService.formatPrice(price);
  }

  randomNumber(): number {
    let max = 9999;
    return Math.floor(Math.random() * max);
  }
}
