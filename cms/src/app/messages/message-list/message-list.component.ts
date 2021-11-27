import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from "../message.model";
import { MessageService } from '../messages.service';
import { ContactService } from 'src/app/contacts/contact.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [];
  private contactListChangedSubscription: Subscription;

  constructor(
    private messageService: MessageService,
    private contactService: ContactService
    ) { }

  ngOnInit(): void {
    this.messageService.getMessages();
    this.messageService.messageChangedEvent
    .subscribe(
      (messages: Message[]) => {
        // if the contacts list has already been loaded, then set messages and return
        if (this.contactService.contacts.length) {
          this.messages = messages;
          return
        }
        // if contacts list is empty, then go get them first before setting the messages
        this.contactService.getContacts()
        this.contactListChangedSubscription = this.contactService.contactChangedEvent
        .subscribe(
          () => {
            this.messages = messages;
          }
        )
      }
    );
  }

  sendMessage(message: Message) {
    this.messages.push(message);
  }

}
