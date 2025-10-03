import { Injectable } from '@angular/core';
import { Client, Message as StompMessage } from '@stomp/stompjs';
import { Subject } from 'rxjs';
import SockJS from 'sockjs-client';
import { environment } from '../../environnements/environnement';

export interface Message {
  from: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private client: Client;
  private messagesSubject = new Subject<Message>();

  messages$ = this.messagesSubject.asObservable();

  constructor() {
    this.client = new Client();
    this.client.webSocketFactory = () => new SockJS(environment.apiUrl + environment.wsEndpoint);

    this.client.onConnect = () => {
      this.client.subscribe('/topic/messages', (msg: StompMessage) => {
        this.messagesSubject.next(JSON.parse(msg.body));
        });
    };
    this.client.activate();
  }

  sendMessage(message: Message) {
    this.client.publish({ destination: '/app/sendMessage', body: JSON.stringify(message) });
  }
}
