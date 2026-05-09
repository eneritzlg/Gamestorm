import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';

interface ItemHistorial {
  idhistorial: number;
  email_usuari: string;
  idProducto: string;
  nombreProducto: string;
  quantitat: number;
  preu_unitari: number;
  en_oferta: boolean;
  data_compra: string;
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  private auth = inject(Auth);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  private apiUrl = `http://${AppComponent.ip}:3090`;

  historial: ItemHistorial[] = [];
  mostrandoHistorial = false;
  cargando = false;
  error: string | null = null;
  seccionActiva: string = 'general';

  perfilForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    telefono: [''],
    direccion: ['']
  });

  mensajeExito: string | null = null;
  mensajeError: string | null = null;
  mensajePasswordExito: string | null = null;
  mensajePasswordError: string | null = null;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.seccionActiva = params['section'] || 'general';
      if (this.seccionActiva === 'historial') {
        this.mostrarHistorial();
      } else {
        this.cargarDatosUsuario();
      }
    });
  }

  cargarDatosUsuario() {
    this.auth.onAuthStateChanged(user => {
      if (user?.email) {
        this.http.get<any>(`${this.apiUrl}/usuari/${user.email}`).subscribe({
          next: (response) => {
            if (response.success) {
              this.perfilForm.patchValue({
                nombre: response.dades.usuarinom || '',
                telefono: response.dades.telefono || '',
                direccion: response.dades.direccion || ''
              });
            }
          },
          error: (err) => console.error('Error carregant perfil:', err)
        });
      }
    });
  }

  guardarCambios() {
    this.mensajeExito = null;
    this.mensajeError = null;

    const user = this.auth.currentUser;
    if (!user?.email || !this.perfilForm.valid) {
      this.mensajeError = 'Por favor, completa los campos correctamente.';
      return;
    }

    this.http.put(`${this.apiUrl}/usuari/${user.email}`, this.perfilForm.value).subscribe({
      next: () => { this.mensajeExito = 'Datos actualizados correctamente.'; },
      error: () => { this.mensajeError = 'No se pudieron guardar los cambios.'; }
    });
  }

  async canviarContrasenya() {
    this.mensajePasswordExito = null;
    this.mensajePasswordError = null;

    const user = this.auth.currentUser;
    if (user?.email) {
      try {
        await sendPasswordResetEmail(this.auth, user.email);
        this.mensajePasswordExito = "T'hem enviat un correu electrònic per restablir la teva contrasenya.";
      } catch {
        this.mensajePasswordError = "Hi ha hagut un problema a l'enviar el correu. Torna-ho a provar més tard.";
      }
    } else {
      this.mensajePasswordError = "No s'ha pogut trobar el teu correu electrònic.";
    }
  }

  mostrarHistorial() {
    this.cargando = true;
    this.error = null;
    this.mostrandoHistorial = true;

    const user = this.auth.currentUser;
    if (!user?.email) {
      this.error = 'Debes iniciar sesión para ver el historial';
      this.cargando = false;
      return;
    }

    this.http.get<ItemHistorial[]>(`${this.apiUrl}/historial/${user.email}`).subscribe({
      next: (data) => {
        this.historial = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar el historial de compras';
        this.cargando = false;
      }
    });
  }
}