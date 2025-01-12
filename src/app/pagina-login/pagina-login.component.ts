import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User, UserStorage } from '../pagina-register/pagina-register.component';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pagina-login',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './pagina-login.component.html',
  styleUrl: './pagina-login.component.css'
})
export class PaginaLoginComponent {
  loginForm = new FormGroup({
    nombreUsuario: new FormControl("", [Validators.required, Validators.minLength(4)]),
    contrasena: new FormControl("", [Validators.required, Validators.minLength(4)])
  });

  paginaNombre: string = 'GameStorm';

  ngOnInit() {
    this.setTitle();
  }

  setTitle() {
    this.titleService.setTitle(`${this.paginaNombre} - Iniciar Sesión`);
  }

  constructor(private router: Router, private titleService: Title) {};

  onsubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      let nombreUsuario = formData.nombreUsuario ?? "";
      let contrasegna = formData.contrasena ?? "";

      if (UserStorage.userExists(nombreUsuario)) {
        let user = UserStorage.getUser(nombreUsuario);

        if (user?.contrasegna === contrasegna) {
          UserStorage.loginUser(user);

          this.router.navigate([""]);
        }
      }
    }
  }
}
