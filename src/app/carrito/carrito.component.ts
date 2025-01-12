import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-carrito',
  imports: [],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit{
  paginaNombre: string = 'GameStorm';

  constructor(private titleService: Title) {}

  ngOnInit() {
    this.setTitle();
  }

  setTitle() {
    this.titleService.setTitle(`${this.paginaNombre} - Carrito`);
  }

}
