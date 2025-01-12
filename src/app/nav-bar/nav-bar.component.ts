import { Component } from '@angular/core';
import { UserStorage } from '../pagina-register/pagina-register.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isLoggedIn: boolean = false;
  isOpen: boolean = false;

  logout() {
    UserStorage.logoutUser();
    this.isLoggedIn = false;
    this.isOpen = false;
  }

  getUserName() {
    return UserStorage.getLoggedUser()?.nombre.toUpperCase();
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.isLoggedIn = UserStorage.getLoggedUser() !== null;
    });
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }


}
