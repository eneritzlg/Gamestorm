import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { NgIf } from "@angular/common";
import { ProductosService } from "../productos.service";
import { CarritoService } from "../carrito.service";
import { SafeUrlPipe } from "../safe-url.pipe";
import { Product } from "../../bd/product"
import {AuthService} from '../auth.service';
import {User} from '@angular/fire/auth';

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
  isLoggedIn: boolean = false;
  user: any = null;
  addtrynotlogin: boolean = false;
  constructor(private productoService: ProductosService, public carritoService: CarritoService, private route: ActivatedRoute, public authService: AuthService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idProducto = params.get('idProducto');
      if (idProducto) {
        this.product = this.productoService.obtenerProductoPorNombreUrl(idProducto);
      } else {
        console.error('URL del producto no válida');
      }
    });
    this.authService.usuario$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.user = user;
    });

    console.log(this.product.videoProducto)
  }

  addToCart(product: Product) {
    if (this.isLoggedIn) {
      this.carritoService.addToCart(product);


      this.addedCorrectly = true;
      setTimeout(() => {
        this.addedCorrectly = false;
      }, 5000);
    }else{
      this.addtrynotlogin = true;
  }}

  formatPrice(price: number): string {
    return this.productoService.formatPrice(price);
  }

  randomNumber(): number {
    let max = 9999;
    return Math.floor(Math.random() * max);
  }
}
