import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { firstValueFrom } from 'rxjs';
import { sendEmailVerification } from '@angular/fire/auth';

@Component({
  selector: 'app-pagina-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pagina-register.component.html',
  styleUrl: './pagina-register.component.css'
})
export class PaginaRegisterComponent implements OnInit {
  paginaNombre: string = 'GameStorm';
  registerForm: FormGroup;
  ip = AppComponent.ip;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private router: Router,
    private titleService: Title,
    public authService: AuthService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.titleService.setTitle(`${this.paginaNombre} - Registro`);
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      this.errorMessage = null;
      this.successMessage = null;

      const { email, password, nombre } = this.registerForm.value;

      try {
        const userCredential = await this.authService.registerWithEmailAndPassword(email, password);

        await sendEmailVerification(userCredential);

        await firstValueFrom(
          this.http.post<any>(`http://${this.ip}:3090/registreUsuariFitxer`, { nombre: nombre, email: email, password: password })
        );

        this.successMessage = "Registre completat amb èxit! Revisa el teu correu per verificar-lo.";
        setTimeout(() => {
          this.router.navigate(["/login"]);
        }, 3500);

      } catch (error: any) {
        console.error("Error en el procés:", error);
        this.errorMessage = "No s'ha pogut completar el registre. El correu ja existeix o hi ha un error de connexió.";
      }
    }
  }
}
