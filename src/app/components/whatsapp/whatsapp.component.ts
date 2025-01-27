import { CommonModule } from '@angular/common';
import { Component, Output } from '@angular/core';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-whatsapp',
  imports: [CommonModule],
  templateUrl: './whatsapp.component.html',
  styleUrl: './whatsapp.component.scss'
})
export class WhatsappComponent {
  showPopup: boolean = false;

  openPopup(): void {
    this.showPopup = true; // Exibe o popup
  }

  closePopup(): void {
    this.showPopup = false; // Fecha o popup
  }

  handleButtonClick(buttonNumber: number): void {
    this.showPopup = false; // Fecha o popup após clicar
    if (buttonNumber === 1) {
      window.open('https://wa.me/5533999432252', '_blank'); // Redireciona para o WhatsApp 1
    } else if (buttonNumber === 2) {
      window.open('https://wa.me/5531973101528', '_blank'); // Redireciona para o WhatsApp 2
    }
  }
  openWhatsapp(){
    window.open('https://wa.me/5533999432252', '_blank')
  }
}
