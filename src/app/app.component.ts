import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import { FooterComponent} from './footer/footer.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  paginaNombre: string = 'GameStorm';

  static ip = "192.168.1.135";

  constructor(private titleService: Title) {}

  ngOnInit() {
    this.setTitle();
  }

  setTitle() {
    this.titleService.setTitle(`${this.paginaNombre}`);
  }
}
