import { inject, Injectable, signal } from '@angular/core';
import { WebsocketService } from '../../websocket/websocket.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private wsService = inject(WebsocketService);

  public isEdit = signal({ id: '', isEdit: false, text: '' });

  public sendMessage(to: string, text: string) {
    this.wsService.sendMessage(to, text);
  }

  public getMessages(userName: string) {
    this.wsService.getMessages(userName);
  }

  public deleteMessage(messageId: string) {
    this.wsService.deleteMessage(messageId);
  }

  public editMessage(text: string) {
    this.wsService.editMessage(text, this.isEdit().id);
  }

  public markAsReaded(id: string) {
    this.wsService.markAsReaded(id);
  }
}
