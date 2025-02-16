import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isLoggedIn: boolean = false;
  isOpen: boolean = false;
  user: any = null;

  constructor(private route: ActivatedRoute, public authService: AuthService) {}

  ngOnInit() {
    this.authService.usuario$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
    this.isOpen = false;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }


}
