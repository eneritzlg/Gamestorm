import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import { ProductosService } from "../productos.service";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pagina-inicio',
  imports: [
    NgForOf,
  ],
  templateUrl: './pagina-inicio.component.html',
  styleUrl: './pagina-inicio.component.css'
})
export class PaginaInicioComponent {

  paginaNombre: string = 'GameStorm';

  setTitle() {
    this.titleService.setTitle(`${this.paginaNombre} - Inicio`);
  }

  newProducts: any[] = [];

  constructor(private productoService: ProductosService, private titleService: Title) {}

  ngOnInit(): void {
    this.newProducts = this.productoService.newProducts;
    this.setTitle();
  }

}
