import { Component, AfterViewInit } from '@angular/core';
import anime from 'animejs';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    // Animación para todos los SVG dentro de '.row'
    anime({
      targets: '.row svg',
      translateY: 10,
      autoplay: true,
      loop: true,
      easing: 'easeInOutSine',
      direction: 'alternate',
    });

    // Animación específica para el elemento con id 'zero'
    anime({
      targets: '#zero',
      translateX: 10,
      autoplay: true,
      loop: true,
      easing: 'easeInOutSine',
      direction: 'alternate',
      scale: [
        { value: 1 },
        { value: 1.4 },
        { value: 1, delay: 250 },
      ],
      rotateY: { value: '+=180', delay: 200 },
    });
  }
}
