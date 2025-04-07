import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import {HttpClient} from '@angular/common/http';



@Component({
  selector: 'app-pagina-login',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './pagina-login.component.html',
  styleUrl: './pagina-login.component.css'
})
export class PaginaLoginComponent {
  email!: string;
  password!: string;
  user: any = null;
  errorMessage: string | null = null;
  verificationMessage: string | null = null;


  paginaNombre: string = 'GameStorm';

  ngOnInit() {
    this.setTitle();
    this.authService.usuario$.subscribe(user => {
      this.user = user;
    });
  }

  setTitle() {
    this.titleService.setTitle(`${this.paginaNombre} - Iniciar Sesión`);
  }

  constructor(private router: Router, private titleService: Title, public authService: AuthService,private http: HttpClient) {};
  loginWithEmailAndPassword() {
    this.errorMessage = null;
    this.verificationMessage = null;

    this.authService.loginWithEmailAndPassword(this.email, this.password)
      .then(() => {
        let email = this.email
        let password = this.password
        // this.http.post<{}>("http://192.168.19.158:3090/registreUsuariFitxer", {email, password});
        console.log("Inicio de sesión exitoso.");
        this.router.navigate([""]);

      })
      .catch(error => {
        if (error.message.includes("verifica tu correo")) {
          this.verificationMessage = "Por favor, revisa tu correo y verifica tu cuenta.";
        } else {
          this.errorMessage = "Credenciales inválidas";
        }
      });
  }

  loginWithGoogle() {
    this.errorMessage = null;
    this.authService.loginWithGoogle()
      .then(() => {

        console.log("Inicio de sesión exitoso.")
        setTimeout(() => {
          this.router.navigate([""]);
        }, 500);
      })
      .catch(error => {
        this.errorMessage = error.message;
      });
  }

}
