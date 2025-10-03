import { Component, OnInit } from '@angular/core';
import { ChatbotService, Message } from '../chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{

 messages: Message[] = [];
 messageText: string = '';
 username = 'User' + Math.floor(Math.random() * 1000); // identifiant temporaire

  constructor(private chatService: ChatbotService) {}

  ngOnInit() {
    this.chatService.messages$.subscribe(msg => {
      this.messages.push(msg);
    });
  }

  sendMessage() {
    if (!this.messageText.trim()) return;

    const msg: Message = { from: this.username, text: this.messageText };
    this.chatService.sendMessage(msg);
    this.messageText = '';
  }

}
