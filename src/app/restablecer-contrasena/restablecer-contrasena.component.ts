import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restablecer-contrasena',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './restablecer-contrasena.component.html',
  styleUrl: './restablecer-contrasena.component.css'
})
export class RestablecerContrasenaComponent {
  email!: string;
  confirmResetPassword = "";
  isLoading: boolean = false;

  constructor(public authService: AuthService) {}

  async onSubmit() {
    if (!this.email) return;

    this.isLoading = true;

    try {
      await this.authService.resetPassword(this.email);
      this.confirmResetPassword = "Se ha enviado un correo para restablecer la contraseña.";
    } catch (error) {
      this.confirmResetPassword = "Error al enviar el correo. Verifica el email ingresado.";
      console.error(error);
    } finally {
      this.isLoading = false;

      setTimeout(() => {
        this.confirmResetPassword = '';
      }, 6000);
    }
  }
}
