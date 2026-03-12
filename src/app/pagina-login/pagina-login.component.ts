import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-pagina-login',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './pagina-login.component.html',
  styleUrl: './pagina-login.component.css'
})
export class PaginaLoginComponent implements OnInit {

  ip = AppComponent.ip;

  email!: string;
  password!: string;
  user: any = null;
  errorMessage: string | null = null;
  verificationMessage: string | null = null;

  paginaNombre: string = 'GameStorm';

  constructor(
    private router: Router,
    private titleService: Title,
    public authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.setTitle();
    this.authService.usuario$.subscribe(user => {
      this.user = user;
    });
  }

  setTitle() {
    this.titleService.setTitle(`${this.paginaNombre} - Iniciar Sesión`);
  }

  loginWithEmailAndPassword() {
    this.errorMessage = null;
    this.verificationMessage = null;

    this.authService.loginWithEmailAndPassword(this.email, this.password)
      .then((usuari: any) => {

        if (usuari && usuari.emailVerified === false) {
          // Si no està verificat, logout i mostrem l'avís
          this.authService.logout();
          this.verificationMessage = "Has de verificar el teu correu abans de poder iniciar sessió. Revisa la teva safata d'entrada.";
          return;
        }

        this.http.get<any>(`http://${this.ip}:3090/usuari/${this.email}`).subscribe({
          next: (response) => {
            if (response.success) {
              console.log(`Inicio de sesión exitoso. Bienvenido, ${response.dades.nombre}!`);
              this.router.navigate([""]);
            }
          },
          error: (err) => {
            console.error("Error al Node.js:", err);
            this.errorMessage = "L'usuari no existeix a la nostra base de dades.";
            this.authService.logout(); // Molt bé pensat això de fer logout si no existeix a Firestore!
          }
        });
      })
      .catch(error => {
        this.errorMessage = "Credencials invàlides o error de connexió.";
      });
  }

  loginWithGoogle() {
    this.errorMessage = null;
    this.authService.loginWithGoogle()
      .then(() => {
        console.log("Inicio de sesión exitoso con Google.");
        setTimeout(() => {
          this.router.navigate([""]);
        }, 500);
      })
      .catch(error => {
        this.errorMessage = error.message;
      });
  }
}
