import { Component, OnInit } from '@angular/core';
import { NgForOf } from "@angular/common";
import { ProductosService } from "../productos.service";
import { Title } from '@angular/platform-browser';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-pagina-inicio',
  imports: [
    NgForOf,
  ],
  templateUrl: './pagina-inicio.component.html',
  standalone: true,
  styleUrl: './pagina-inicio.component.css'
})
export class PaginaInicioComponent implements OnInit {

  ip = AppComponent.ip;
  paginaNombre: string = 'GameStorm';

  constructor(
    private productoService: ProductosService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.setTitle();
  }

  setTitle() {
    this.titleService.setTitle(`${this.paginaNombre} - Inicio`);
  }

  get newProducts() {
    return this.productoService.newProducts;
  }

}
