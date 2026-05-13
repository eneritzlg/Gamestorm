import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class IaBotService {
  private http = inject(HttpClient);
  private apiUrl = `http://${AppComponent.ip}:3090/chat`;

  sendMessage(missatge: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { missatge });
  }
}
