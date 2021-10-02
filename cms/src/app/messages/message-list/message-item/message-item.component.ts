import { Message } from '../../message.model'
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {

  @Input() message: Message;
  // @Output() messageSelected = new EventEmitter<void>();


  constructor() { }

  ngOnInit(): void {
  }

}
