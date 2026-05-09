import { Injectable, inject } from '@angular/core';
import { Auth, sendPasswordResetEmail, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, User, UserCredential } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { CarritoService } from './carrito.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private carritoService = inject(CarritoService);

  private usuarioSubject = new BehaviorSubject<User | null>(null);
  usuario$ = this.usuarioSubject.asObservable();

  constructor() {
    this.cargarUsuarioDesdeSessionStorage();
  }

  async loginWithGoogle(): Promise<void> {
    try {
      const credential: UserCredential = await signInWithPopup(this.auth, new GoogleAuthProvider());
      this.guardarDatosUsuario(credential.user);
      if (credential.user.email) {
        await this.carritoService.recuperarCistella(credential.user.email);
      }
    } catch (error: any) {
      console.error('Error en login con Google:', error);
      throw error;
    }
  }

  async registerWithEmailAndPassword(email: string, pass: string) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, pass);
    await signOut(this.auth);
    return userCredential.user;
  }

  async loginWithEmailAndPassword(email: string, password: string) {
    try {
      const credential: UserCredential = await signInWithEmailAndPassword(this.auth, email, password);
      this.guardarDatosUsuario(credential.user);
      return credential.user;
    } catch (error) {
      console.error('Error en el login:', error);
      throw error;
    }
  }

  async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      console.error('Error al restablecer contraseña:', error);
      throw error;
    }
  }

  async logout() {
    const user = this.auth.currentUser;
    if (user?.email) {
      await this.carritoService.guardarCistella(user.email);
    }
    await signOut(this.auth);
    sessionStorage.removeItem('user');
    this.carritoService.clearCart();
    this.usuarioSubject.next(null);
  }

  private guardarDatosUsuario(user: User) {
    if (user) {
      const userData = {
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified
      };
      sessionStorage.setItem('user', JSON.stringify(userData));
      this.usuarioSubject.next(user);
    }
  }

  private cargarUsuarioDesdeSessionStorage() {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      this.usuarioSubject.next(JSON.parse(userData));
    }
  }
}