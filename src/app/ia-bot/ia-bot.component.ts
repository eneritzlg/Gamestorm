import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IaBotService } from '../ia-bot.service';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Component({
  selector: 'app-ia-bot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ia-bot.component.html',
  styleUrl: './ia-bot.component.css'
})
export class IaBotComponent {
  private iaBotService = inject(IaBotService);

  isOpen = signal(false);
  userInput: string = '';
  messages = signal<Message[]>([
    {
      text: 'Hola! Sóc en BobbyBot, l\'assistent de Gamestorm. En què et puc ajudar?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  isLoading = signal(false);

  toggleChat() {
    this.isOpen.update(v => !v);
  }

  async sendMessage() {
    const text = this.userInput.trim();
    if (!text || this.isLoading()) return;

    // Add user message
    this.messages.update(prev => [...prev, {
      text,
      sender: 'user',
      timestamp: new Date()
    }]);

    this.userInput = '';
    this.isLoading.set(true);

    this.iaBotService.sendMessage(text).subscribe({
      next: (res) => {
        this.messages.update(prev => [...prev, {
          text: res.resposta,
          sender: 'bot',
          timestamp: new Date()
        }]);
        this.isLoading.set(false);
        this.scrollToBottom();
      },
      error: (err) => {
        console.error('Error with BobbyBot:', err);
        this.messages.update(prev => [...prev, {
          text: 'Ho sento, he tingut un error en connectar amb el servidor. Torna-ho a provar més tard.',
          sender: 'bot',
          timestamp: new Date()
        }]);
        this.isLoading.set(false);
        this.scrollToBottom();
      }
    });
  }

  private scrollToBottom() {
    setTimeout(() => {
      const container = document.querySelector('.messages-container');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 100);
  }
}
