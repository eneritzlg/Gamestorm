import { Injectable } from '@angular/core';
import { Auth, sendEmailVerification, sendPasswordResetEmail, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, User, UserCredential } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioSubject = new BehaviorSubject<User | null>(null);
  usuario$ = this.usuarioSubject.asObservable();

  constructor(private auth: Auth) {
    this.cargarUsuarioDesdeSessionStorage();
  }

  async loginWithGoogle(): Promise<void> {
    try {
      const credential: UserCredential = await signInWithPopup(this.auth, new GoogleAuthProvider());
      this.guardarDatosUsuario(credential.user);
    } catch (error: any) {
      console.error("Error en login con Google:", error);
      throw error;
    }
  }

  async registerWithEmailAndPassword(email: string, password: string) {
    try {
      const credential: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      await this.sendVerificationEmail(credential.user);
      this.guardarDatosUsuario(credential.user);
    } catch (error) {
      console.error("Error en el registro:", error);
      throw error;
    }
  }

  async loginWithEmailAndPassword(email: string, password: string) {
    try {
      const credential: UserCredential = await signInWithEmailAndPassword(this.auth, email, password);
      if (!credential.user.emailVerified) {
        throw new Error("Por favor, verifica tu correo antes de iniciar sesión.");
      }
      this.guardarDatosUsuario(credential.user);
    } catch (error) {
      console.error("Error en el login:", error);
      throw error;
    }
  }

  async sendVerificationEmail(user: User) {
    if (user) {
      try {
        await sendEmailVerification(user);
        console.log("Correo de verificación enviado.");
      } catch (error) {
        console.error("Error al enviar correo de verificación:", error);
        throw error;
      }
    }
  }

  async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(this.auth, email);
      console.log("Correo de restablecimiento enviado.");
    } catch (error) {
      console.error("Error al restablecer contraseña:", error);
      throw error;
    }
  }

  async logout() {
    await signOut(this.auth);
    sessionStorage.removeItem('user');
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
