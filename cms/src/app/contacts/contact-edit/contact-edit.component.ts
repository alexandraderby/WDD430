import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  groupContacts: [];

  constructor() { }

  ngOnInit(): void {
  }

  onCancel() {
    console.log("test");
  }

}
