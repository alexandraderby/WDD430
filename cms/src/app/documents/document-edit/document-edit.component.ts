import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  @ViewChild('f') documentForm: NgForm;
  subscription: Subscription;


  constructor() { }

  ngOnInit(): void {
  }

  onCancel() {
    console.log("test");
  }

  onSubmit(form: NgForm) {

  }

}
