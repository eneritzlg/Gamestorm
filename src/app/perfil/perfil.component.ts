import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, query, where, getDocs, doc, updateDoc } from '@angular/fire/firestore';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Compra {
  productos: Array<{
    idProducto: string;
    nombre: string;
    cantidad: number;
    precioUnitario: number;
    descuento: number;
  }>;
  fechaCompra: Date;
  total: number;
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  compras: Compra[] = [];
  mostrandoHistorial = false;
  cargando = false;
  error: string | null = null;
  seccionActiva: string = 'general';

  perfilForm: FormGroup;
  usuarioDocId: string | null = null;
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.perfilForm = this.fb.group({
      nombre: ['', Validators.required],
      telefono: [''],
      direccion: ['']
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.seccionActiva = params['section'] || 'general';

      if (this.seccionActiva === 'historial') {
        this.mostrarHistorial();
      } else if (this.seccionActiva === 'general') {
        this.cargarDatosUsuario();
      }
    });
  }

  async cargarDatosUsuario() {
    this.auth.onAuthStateChanged(async (user) => {
      if (user && user.email) {
        try {
          const q = query(collection(this.firestore, 'usuaris'), where('email', '==', user.email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            this.usuarioDocId = userDoc.id;
            const data = userDoc.data();

            this.perfilForm.patchValue({
              nombre: data['nombre'] || '',
              telefono: data['telefono'] || '',
              direccion: data['direccion'] || ''
            });
          }
        } catch (error) {
          console.error("Error cargando perfil:", error);
        }
      }
    });
  }

  async guardarCambios() {
    this.mensajeExito = null;
    this.mensajeError = null;

    if (this.perfilForm.valid && this.usuarioDocId) {
      try {
        const docRef = doc(this.firestore, 'usuaris', this.usuarioDocId);
        await updateDoc(docRef, this.perfilForm.value);
        this.mensajeExito = "Datos actualizados correctamente.";
      } catch (error) {
        console.error("Error al guardar:", error);
        this.mensajeError = "No se pudieron guardar los cambios.";
      }
    } else {
      this.mensajeError = "Por favor, completa los campos correctamente.";
    }
  }

  // Canvi de contrasenya
  mensajePasswordExito: string | null = null;
  mensajePasswordError: string | null = null;

  async canviarContrasenya() {
    this.mensajePasswordExito = null;
    this.mensajePasswordError = null;

    const user = this.auth.currentUser;

    if (user && user.email) {
      try {
        // Enviament de correu per a resetejar contrasenya automàticament desde firebase
        await sendPasswordResetEmail(this.auth, user.email);
        this.mensajePasswordExito = "T'hem enviat un correu electrònic amb les instruccions per restablir la teva contrasenya. Revisa la teva safata d'entrada (i el correu brossa).";
      } catch (error) {
        console.error("Error a l'enviar el correu:", error);
        this.mensajePasswordError = "Hi ha hagut un problema a l'enviar el correu. Torna-ho a provar més tard.";
      }
    } else {
      this.mensajePasswordError = "No s'ha pogut trobar el teu correu electrònic.";
    }
  }


  async mostrarHistorial() {
    try {
      this.cargando = true;
      this.error = null;
      this.mostrandoHistorial = true;

      const user = this.auth.currentUser;
      if (!user) {
        this.error = 'Debes iniciar sesión para ver el historial';
        return;
      }

      const comprasRef = collection(this.firestore, 'compras');
      const q = query(comprasRef, where('usuarioId', '==', user.uid));

      const querySnapshot = await getDocs(q);

      this.compras = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          productos: data['productos'],
          total: data['total'],
          fechaCompra: data['fechaCompra'].toDate()
        };
      });

    } catch (error) {
      console.error('Error al cargar historial:', error);
      this.error = 'Error al cargar el historial de compras';
      this.mostrandoHistorial = false;
    } finally {
      this.cargando = false;
    }
  }
}
