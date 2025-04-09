import { Injectable, inject } from '@angular/core';
import { Product } from '../bd/product';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, addDoc, runTransaction, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private firestore: Firestore = inject(Firestore);
  private auth: Auth = inject(Auth);
  carrito: Product[] = [];

  constructor() {
    this.cargarCarritoDesdeLocalStorage();
  }

  private cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carrito = JSON.parse(carritoGuardado);
    }
  }

  addToCart(producto: Product) {
    const productoExistente = this.carrito.find(p => p.idProducto === producto.idProducto);
    if (productoExistente) {
      productoExistente.cantidadCarrito++;
    } else {
      producto.cantidadCarrito = 1;
      this.carrito.push(producto);
    }
    this.guardarCarritoEnLocalStorage();
  }

  clearCart() {
    this.carrito = [];
    localStorage.removeItem('carrito');
  }

  guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  getCart() {
    return this.carrito;
  }

  async finalizarCompra() {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Debes iniciar sesión para completar la compra');

    // 1. Actualizar stock con transacción
    await runTransaction(this.firestore, async (transaction) => {
      for (const producto of this.carrito) {
        const productoRef = doc(this.firestore, `productos/${producto.idProducto}`);
        const docSnap = await transaction.get(productoRef);

        if (!docSnap.exists()) throw new Error(`Producto ${producto.nombreProducto} no encontrado`);

        const nuevoStock = docSnap.data()['stockProducto'] - producto.cantidadCarrito;
        if (nuevoStock < 0) throw new Error(`Stock insuficiente para ${producto.nombreProducto}`);

        transaction.update(productoRef, { stockProducto: nuevoStock });
      }
    });

    // 2. Registrar compra en Firestore
    const compraData = {
      usuarioId: user.uid,
      productos: this.carrito.map(p => ({
        idProducto: p.idProducto,
        nombre: p.nombreProducto,
        cantidad: p.cantidadCarrito,
        precioUnitario: p.precioProducto,
        descuento: p.porcentajeDescuentoProducto || 0
      })),
      fechaCompra: new Date(), // Firestore lo convertirá a Timestamp
      total: this.carrito.reduce((acc, p) => acc + (p.precioProducto * p.cantidadCarrito), 0)
    };

    const comprasRef = collection(this.firestore, 'compras');
    await addDoc(comprasRef, compraData);

    // 3. Vaciar carrito y limpiar localStorage
    this.clearCart();
  }
}
