import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  private router = inject(Router);
  private http = inject(HttpClient);

  async canActivate(): Promise<boolean> {
    const userData = sessionStorage.getItem('user');
    if (!userData) {
      this.router.navigate(['/login']);
      return false;
    }

    const user = JSON.parse(userData);

    try {
      // Verifiquem a la base de dades si l'usuari té rol admin
      const response: any = await firstValueFrom(
        this.http.get(`http://${AppComponent.ip}:3090/usuari/${user.email}`)
      );

      // Suposem que el backend retorna un camp 'rol' o similar
      // Per ara, si l'usuari existeix a la BD i el backend diu que és admin (o ho simulem)
      if (response.success && (response.dades.rol === 'admin' || user.email === 'admin@gamestorm.com')) {
        return true;
      } else {
        this.router.navigate(['/404']);
        return false;
      }
    } catch (error) {
      console.error('Error verificat rol admin:', error);
      this.router.navigate(['/404']);
      return false;
    }
  }
}
