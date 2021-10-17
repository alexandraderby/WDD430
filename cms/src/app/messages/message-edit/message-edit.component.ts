import { Component, OnInit, ViewChild, EventEmitter, Output, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../messages.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  @ViewChild('msgTextInput') msgTextInputRef: ElementRef;
  @ViewChild('subjectInput') subjectInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender: string = "18";
  messageId: string = "1";


  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
  }

  onSendMessage(message) {
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;
    const newMessage = new Message(this.messageId, subject, msgText, this.currentSender);
    //this.addMessageEvent.emit(newMessage);
    this.messageService.addMessage(newMessage);
    this.msgTextInputRef.nativeElement.value = "";
    this.subjectInputRef.nativeElement.value = "";
  }

  onClear() {
    this.msgTextInputRef.nativeElement.value = "";
    this.subjectInputRef.nativeElement.value = "";
  }


}
