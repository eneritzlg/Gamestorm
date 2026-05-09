import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarritoService } from '../carrito.service';
import { AppComponent } from '../app.component';
import { Product } from '../../bd/product';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  standalone: true,
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {

  paginaNombre: string = 'GameStorm';
  ip = AppComponent.ip;

  Name: string = '';
  Surname: string = '';
  email: string = '';
  address: string = '';
  address2: string = '';
  country: string = '';
  Postcode: number = 0;
  paymentMethod: string = '';
  cc_number: number = 0;
  cc_expiration: number = 0;
  cc_Titular: string = '';
  cc_cvv: number = 0;

  errorMessage: string | null = null;
  successMessage: string | null = null;
  processant: boolean = false;

  constructor(
    private router: Router,
    private titleService: Title,
    public carritoService: CarritoService
  ) {}

  ngOnInit() {
    this.titleService.setTitle(`${this.paginaNombre} - Carrito`);

    const userData = sessionStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.email = user.email || '';
    }
  }

  get productes(): Product[] {
    return this.carritoService.getCart();
  }

  get total(): number {
    return this.carritoService.getTotalPreu();
  }

  eliminarProducte(idProducto: string) {
    this.carritoService.removeFromCart(idProducto);
  }

  async onsubmit() {
    this.errorMessage = null;
    this.successMessage = null;

    if (!this.email) {
      this.errorMessage = 'Cal iniciar sessió per completar la compra.';
      return;
    }

    if (this.productes.length === 0) {
      this.errorMessage = 'El carrito está vacío.';
      return;
    }

    this.processant = true;
    try {
      await this.carritoService.finalizarCompra(this.email);
      this.successMessage = 'Compra realitzada amb èxit! Gràcies per la teva compra.';
      setTimeout(() => this.router.navigate(['/catalogo']), 2000);
    } catch (error: any) {
      console.error('Error finalitzant compra:', error);
      this.errorMessage = 'Hi ha hagut un error processant la compra. Torna-ho a intentar.';
    } finally {
      this.processant = false;
    }
  }
}