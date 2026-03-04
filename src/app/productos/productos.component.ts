import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from "@angular/common";
import { ProductosService } from "../productos.service";
import { CarritoService } from "../carrito.service";
import { SafeUrlPipe } from "../safe-url.pipe";
import { Product } from "../../bd/product";
import { AuthService } from '../auth.service';
import { User } from '@angular/fire/auth';
import { AppComponent } from '../app.component';

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

  // 1. Esborrem la variable 'product: any;' i creem aquesta per guardar la ID de la URL
  idProductoActual: string | null = null;

  addedCorrectly = false;
  isLoggedIn: boolean = false;
  user: any = null;
  addtrynotlogin: boolean = false;

  ip = AppComponent.ip;

  constructor(
    private productoService: ProductosService,
    public carritoService: CarritoService,
    private route: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    // 2. Només guardem la ID, no busquem el producte encara!
    this.route.paramMap.subscribe(params => {
      this.idProductoActual = params.get('idProducto');
    });

    this.authService.usuario$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.user = user;
    });
  }

  // 3. Aquest GETTER és la clau. L'HTML el cridarà constantment.
  // Al principi no trobarà res, però tan bon punt arribin els jocs de la BD,
  // trobarà el teu producte i l'HTML el dibuixarà a l'instant!
  get product() {
    if (this.idProductoActual) {
      return this.productoService.obtenerProductoPorNombreUrl(this.idProductoActual);
    }
    return null;
  }

  addToCart(product: Product) {
    if (this.isLoggedIn) {
      this.carritoService.addToCart(product);
      this.addedCorrectly = true;
      setTimeout(() => {
        this.addedCorrectly = false;
      }, 5000);
    } else {
      this.addtrynotlogin = true;
    }
  }

  formatPrice(price: number): string {
    return this.productoService.formatPrice(price);
  }

  randomNumber(): number {
    let max = 9999;
    return Math.floor(Math.random() * max);
  }
}
