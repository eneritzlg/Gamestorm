import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';

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
  user: any = null;
  ip = AppComponent.ip;

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    private http: HttpClient
  ) {}

  // Variables per la curiositat interactiva
  estatCuriositat: 'pregunta' | 'resposta' | 'error' = 'pregunta';
  textMostrar: string = "🎮 Buscant una curiositat...";
  respostaActual: string = "";

  ngOnInit() {
    this.authService.usuario$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.user = user;
    });

    this.carregarCuriositat();
  }

  carregarCuriositat() {
    this.textMostrar = "🎮 Carregant una nova pregunta...";
    this.estatCuriositat = 'pregunta';

    this.http.get<any>('https://opentdb.com/api.php?amount=1&category=15').subscribe({
      next: (response) => {
        if (response.results && response.results.length > 0) {
          const dades = response.results[0];
          // Guardem la pregunta i la resposta
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
      // Si estem veient la pregunta, mostrem la resposta
      this.textMostrar = this.respostaActual;
      this.estatCuriositat = 'resposta';
    } else if (this.estatCuriositat === 'resposta') {
      // Si ja hem vist la resposta, busquem una pregunta nova
      this.carregarCuriositat();
    }
  }

  logout() {
    this.authService.logout();
    this.isOpen = false;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
