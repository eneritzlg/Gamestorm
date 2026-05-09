import { Component, OnInit, OnDestroy, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import * as tmImage from '@teachablemachine/image';

@Component({
  selector: 'app-ia-vigilant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ia-vigilant.component.html',
  styleUrl: './ia-vigilant.component.css'
})
export class IaVigilantComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);

  // URL del model (l'usuari haurà d'entrenar-lo i posar la seva URL aquí)
  // Per ara posem una de mostra o buida
  private modelURL = 'https://teachablemachine.withgoogle.com/models/b6NEEQ0y1/';

  private model: any;
  private webcam: any;
  private labelContainer: any;
  private maxPredictions: number = 0;

  gestosDetectats: number = 0;
  ultimGest: string = 'Cap';
  probabilitat: string = '0%';
  activo: boolean = false;

  @ViewChild('webcamContainer', { static: false }) webcamContainer!: ElementRef;

  async ngOnInit() {
    this.authService.usuario$.subscribe(user => {
      if (user && !this.activo) {
        this.initIA();
      } else if (!user && this.activo) {
        this.stopIA();
      }
    });
  }

  ngOnDestroy() {
    this.stopIA();
  }

  async initIA() {
    try {
      const checkpointURL = this.modelURL + "model.json";
      const metadataURL = this.modelURL + "metadata.json";

      this.model = await tmImage.load(checkpointURL, metadataURL);
      this.maxPredictions = this.model.getTotalClasses();

      const flip = true;
      this.webcam = new tmImage.Webcam(200, 200, flip);
      await this.webcam.setup();
      await this.webcam.play();
      this.activo = true;

      window.requestAnimationFrame(() => this.loop());

      if (this.webcamContainer) {
        this.webcamContainer.nativeElement.appendChild(this.webcam.canvas);
      }
    } catch (error) {
      console.error("Error iniciant IA Vigilant:", error);
    }
  }

  async loop() {
    if (this.activo) {
      this.webcam.update();
      await this.predict();
      window.requestAnimationFrame(() => this.loop());
    }
  }

  async predict() {
    const prediction = await this.model.predict(this.webcam.canvas);

    // Busquem si algun gest "dolent" té alta probabilitat
    for (let i = 0; i < this.maxPredictions; i++) {
      const classPrediction = prediction[i].className;
      const probability = prediction[i].probability;

      if (classPrediction === 'Class 2' && probability > 0.9) {
        this.gestosDetectats++;
        this.ultimGest = 'Class 2';
        this.probabilitat = (probability * 100).toFixed(0) + '%';

        console.warn("Gest ofensiu detectat! Comptador:", this.gestosDetectats);

        if (this.gestosDetectats >= 3) {
          alert("Sessió tancada per comportament inadequat.");
          this.authService.logout();
          this.stopIA();
        }
      }
    }
  }

  stopIA() {
    this.activo = false;
    if (this.webcam) {
      this.webcam.stop();
    }
    this.gestosDetectats = 0;
  }
}
