import { Injectable, EventEmitter } from "@angular/core";
import { Message } from "./message.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
  })
export class MessageService {

    messageChangedEvent = new EventEmitter<Message[]>();

    messages: Message[] = [];
    maxMessageId: number;

    constructor(private http: HttpClient) {
      this.maxMessageId = this.getMaxId();
    }

    getMaxId(): number {
      let maxId = 0;
      for (let message of this.messages) {
        let currentId = +message.id;
        if (currentId > maxId) {
          maxId = currentId;
        } 
      }
      return maxId;
     }

    getMessages() {
      return this.http.get<Message[]>('https://cms-database-aafd8-default-rtdb.firebaseio.com/messages.json')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messages.sort((a,b) => {
            if (a.sender > b.sender) {
              return 1;
            }
            if (a.sender < b.sender) {
              return -1;
            }
            return 0;
          });
        let messageListCopy = this.messages.slice();
        this.messageChangedEvent.next(messageListCopy);
      },
      (error: any) => {
        console.log(error);
      } 
    )
    }

    storeMessages() {
      let jsonMessages = JSON.stringify(this.messages);
      let options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
      this.http.put('https://cms-database-aafd8-default-rtdb.firebaseio.com/messages.json', jsonMessages, options)
        .subscribe(
          () => {
            this.messageChangedEvent.next(this.messages.slice());
          }
        );
    }

    getMessage(id: string) {
        for (let message of this.messages) {
            if(message.id == id) {
             return message;
            } 
        }
     }

     addMessage(message: Message) {
        message.id = this.maxMessageId.toString();
        this.messages.push(message);
        this.storeMessages();

     }
}