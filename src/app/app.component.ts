import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import { FooterComponent} from './footer/footer.component';
import { ProductosComponent} from './productos/productos.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, FooterComponent, ProductosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gamestorm';
}
