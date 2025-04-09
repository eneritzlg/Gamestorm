import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';

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
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  compras: Compra[] = [];
  mostrandoHistorial = false;
  cargando = false;
  error: string | null = null;
  seccionActiva: string = 'general';

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.seccionActiva = params['section'] || 'general';

      // Cargar automáticamente el historial al entrar en la sección
      if (this.seccionActiva === 'historial') {
        this.mostrarHistorial();
      }
    });
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
