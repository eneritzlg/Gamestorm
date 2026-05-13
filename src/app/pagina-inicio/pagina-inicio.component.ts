import { Component, OnInit, inject, AfterViewInit } from '@angular/core';
import { NgForOf, NgIf, NgClass } from "@angular/common";
import { ProductosService } from "../productos.service";
import { Title } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pagina-inicio',
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    FormsModule
  ],
  templateUrl: './pagina-inicio.component.html',
  standalone: true,
  styleUrl: './pagina-inicio.component.css'
})
export class PaginaInicioComponent implements OnInit, AfterViewInit {

  ip = AppComponent.ip;
  paginaNombre: string = 'GameStorm';
  
  private http = inject(HttpClient);
  private recaptchaWidgetId: any = null;

  contacte = {
    nom: '',
    email: '',
    consulta: ''
  };

  missatgeStatus: string | null = null;
  success: boolean = false;

  constructor(
    private productoService: ProductosService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.setTitle();
  }

  ngAfterViewInit(): void {
    this.renderRecaptcha();
  }

  private renderRecaptcha(retries = 0): void {
    if ((window as any).grecaptcha && (window as any).grecaptcha.render) {
      try {
        this.recaptchaWidgetId = (window as any).grecaptcha.render('recaptcha-container', {
          'sitekey': '6LdWMeUsAAAAAP-Rg8DyCbcx--MVSGLiGrx-8Hdn'
        });
      } catch (e) {
        console.warn("reCAPTCHA already rendered or container missing", e);
      }
    } else if (retries < 10) {
      // Si el script encara no s'ha carregat, esperem un moment i tornem a intentar-ho
      setTimeout(() => this.renderRecaptcha(retries + 1), 500);
    }
  }

  setTitle() {
    this.titleService.setTitle(`${this.paginaNombre} - Inicio`);
  }

  get newProducts() {
    return this.productoService.newProducts;
  }

  enviarConsulta() {
    const captchaToken = (window as any).grecaptcha.getResponse(this.recaptchaWidgetId);

    if (!captchaToken) {
      this.missatgeStatus = "Si us plau, completa el CAPTCHA.";
      this.success = false;
      return;
    }

    const data = {
      ...this.contacte,
      captchaToken
    };

    this.http.post<any>(`http://${this.ip}:3090/consulta`, data).subscribe({
      next: (res) => {
        if (res.success) {
          this.missatgeStatus = "Consulta enviada correctament!";
          this.success = true;
          this.contacte = { nom: '', email: '', consulta: '' };
          (window as any).grecaptcha.reset(this.recaptchaWidgetId);
        } else {
          this.missatgeStatus = "Error: " + res.message;
          this.success = false;
        }
      },
      error: (err) => {
        console.error("Error enviant consulta:", err);
        this.missatgeStatus = "S'ha produït un error al servidor.";
        this.success = false;
      }
    });
  }

}
