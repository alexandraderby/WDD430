import { Injectable, EventEmitter } from "@angular/core";
import { MOCKMESSAGES } from "./MOCKMESSAGES";
import { Message } from "./message.model";

@Injectable({
    providedIn: 'root'
  })
export class MessageService {

    messageChangedEvent = new EventEmitter<Message[]>();

    messages: Message[] = [];

    constructor() {
      this.messages = MOCKMESSAGES;
    }

    getMessages() {
        return this.messages.slice();
    }

    getMessage(id: string) {
        for (let message of this.messages) {
            if(message.id == id) {
             return message;
            } 
        }
     }

     addMessage(message: Message) {
        this.messages.push(message);
        this.messageChangedEvent.emit(this.messages.slice());

     }
}