import { Component, OnInit } from '@angular/core';
import { Message } from "../message.model";

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(21, "Hello!", "It was great seeing you earlier today", "Gromit"),
    new Message(22, "Never again...", "Will I eat 37 chocolate bars in one sitting", "Nat"),
    new Message(23, "Happy!", "It was great eating 56 bars of chocolate earlier today!", "Wallace"),
    new Message(24, "Candy", "Candy is far better than chocolate", "Bunny"),

    // this.id = id;
    // this.subject = subject;
    // this.msgText = msgText;
    // this.sender = sender;

  ];

  constructor() { }

  ngOnInit(): void {
  }

  sendMessage(message: Message) {
    this.messages.push(message);
  }

}
