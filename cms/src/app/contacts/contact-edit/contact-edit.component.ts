import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  groupContacts: Contact[] = [];
  originalContact: Contact;
  contact: Contact;
  editMode: boolean = false;
  subscription: Subscription;
  id: string;

  constructor(  private contactService: ContactService,
                private router: Router,
                private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.params.subscribe (
      contact => {
        let id = contact.id;
        if (!id) {
          this.editMode = false;
          return;
        } 
        this.originalContact = this.contactService.getContact(id);
        if (!this.originalContact) {
          return;
        } 
        this.editMode = true;
        this.contact = this.originalContact;
  
        if (this.contact.group) {
          this.groupContacts = this.contact.group;
        }
    })
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newContact = new Contact(value.id, value.name, value.email, value.phone, value.imageUrl, value.group);
    if (this.editMode == true) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
