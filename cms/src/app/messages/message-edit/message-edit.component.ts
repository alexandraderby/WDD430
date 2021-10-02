import { Component, OnInit, ViewChild, EventEmitter, Output, ElementRef } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  @ViewChild('msgTextInput') msgTextInputRef: ElementRef;
  @ViewChild('subjectInput') subjectInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender: string = "Alexandra";
  messageId: number = 1;


  constructor() { 

  }

  ngOnInit(): void {
  }

  onSendMessage() {
    const msgText = this.msgTextInputRef.nativeElement.value;
    const subject = this.subjectInputRef.nativeElement.value;
    const id = this.messageId;
    const sender = this.currentSender;
    const newMessage = new Message(id, msgText, subject, sender);
    this.addMessageEvent.emit(newMessage);
    this.messageId++;
  }

  onClear() {
    this.msgTextInputRef.nativeElement.value = "";
    this.subjectInputRef.nativeElement.value = "";
  }

  //   const ingName = this.nameInputRef.nativeElement.value;
  //   const ingAmount = this.amountInputRef.nativeElement.value;
  //   const newIngredient = new Ingredient(ingName, ingAmount);
  //   this.ingredientAdded.emit(newIngredient);

}
