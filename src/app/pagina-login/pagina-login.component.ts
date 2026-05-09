import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CarritoService } from '../carrito.service';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';

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
    private carritoService: CarritoService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.titleService.setTitle(`${this.paginaNombre} - Iniciar Sesión`);
    this.authService.usuario$.subscribe(user => {
      this.user = user;
    });
  }

  loginWithEmailAndPassword() {
    this.errorMessage = null;
    this.verificationMessage = null;

    this.authService.loginWithEmailAndPassword(this.email, this.password)
      .then(async (usuari: any) => {

        if (usuari && usuari.emailVerified === false) {
          await this.authService.logout();
          this.verificationMessage = "Has de verificar el teu correu abans de poder iniciar sessió. Revisa la teva safata d'entrada.";
          return;
        }

        this.http.get<any>(`http://${this.ip}:3090/usuari/${this.email}`).subscribe({
          next: async (response) => {
            if (response.success) {
              await this.carritoService.recuperarCistella(this.email);
              this.router.navigate(['']);
            }
          },
          error: (err) => {
            console.error('Error al Node.js:', err);
            this.errorMessage = "L'usuari no existeix a la nostra base de dades.";
            this.authService.logout();
          }
        });
      })
      .catch(() => {
        this.errorMessage = 'Credencials invàlides o error de connexió.';
      });
  }

  loginWithGoogle() {
    this.errorMessage = null;
    this.authService.loginWithGoogle()
      .then(() => {
        this.router.navigate(['']);
      })
      .catch(error => {
        this.errorMessage = error.message;
      });
  }
}