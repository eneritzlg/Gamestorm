import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { CarritoService } from '../carrito.service';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  standalone: true,
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isOpen: boolean = false;
  user: any = null;     // Usuari de Firebase
  userDB: any = null;   // Usuari de la BD (amb el rol)
  ip = AppComponent.ip;

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    private http: HttpClient,
    public carritoService: CarritoService
  ) {}

  // Variables per la curiositat interactiva
  estatCuriositat: 'pregunta' | 'resposta' | 'error' = 'pregunta';
  textMostrar: string = "🎮 Buscant una curiositat...";
  respostaActual: string = "";

  ngOnInit() {
    this.authService.usuario$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.user = user;

      // SI l'usuari s'ha loguejat a Firebase, anem a buscar el seu ROL a la BD
      if (user && user.email) {
        this.obtenirUsuariBD(user.email);
      } else {
        this.userDB = null;
      }
    });

    this.carregarCuriositat();
  }

  // Crida al teu backend per obtenir el rol i dades de MySQL
  obtenirUsuariBD(email: string) {
    this.http.get<any>(`http://${this.ip}:3090/usuari/${email}`).subscribe({
      next: (response) => {
        if (response.success) {
          this.userDB = response.dades;
          console.log("[NavBar] Usuari de BD carregat:", this.userDB);
        }
      },
      error: (err) => {
        console.error("[NavBar] Error obtenint usuari de la BD:", err);
      }
    });
  }

  carregarCuriositat() {
    this.textMostrar = "🎮 Carregant una nova pregunta...";
    this.estatCuriositat = 'pregunta';

    this.http.get<any>('https://opentdb.com/api.php?amount=1&category=15').subscribe({
      next: (response) => {
        if (response.results && response.results.length > 0) {
          const dades = response.results[0];
          this.textMostrar = `👾 Pregunta: ${dades.question}`;
          this.respostaActual = `💡 Resposta: ${dades.correct_answer} (Clica per una altra)`;
        }
      },
      error: (err) => {
        console.error("Error carregant l'API:", err);
        this.textMostrar = "🔥 Aprofita el nostre catàleg! Els millors jocs al millor preu. 🔥";
        this.estatCuriositat = 'error';
      }
    });
  }

  avancarCuriositat() {
    if (this.estatCuriositat === 'pregunta') {
      this.textMostrar = this.respostaActual;
      this.estatCuriositat = 'resposta';
    } else if (this.estatCuriositat === 'resposta') {
      this.carregarCuriositat();
    }
  }

  logout() {
    this.authService.logout();
    this.isOpen = false;
    this.userDB = null; // Netegem també l'usuari de BD
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
