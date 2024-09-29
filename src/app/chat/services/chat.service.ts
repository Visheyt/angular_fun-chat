import { inject, Injectable } from '@angular/core';
import { WebsocketService } from '../../websocket/websocket.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private wsService = inject(WebsocketService);

  public sendMessage(to: string, text: string) {
    this.wsService.sendMessage(to, text);
  }

  public getMessages(userName: string) {
    console.log(userName);
    this.wsService.getMessages(userName);
  }
}
