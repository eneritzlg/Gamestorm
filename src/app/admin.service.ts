import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  private apiUrl = `http://${AppComponent.ip}:3090/admin`;

  getVendesPerDia(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vendes-per-dia`);
  }

  getVendesOferta(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vendes-oferta`);
  }

  getHistorialGlobal(): Observable<any[]> {
    // Suposem que aquest endpoint existeix basant-nos en el requeriment de llista d'historial
    return this.http.get<any[]>(`http://${AppComponent.ip}:3090/historial/tots`);
  }
}
