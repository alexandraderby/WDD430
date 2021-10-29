import {Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import { Subject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ContactService {

   contactSelectedEvent = new EventEmitter<Contact>();
   contactChangedEvent = new Subject<Contact[]>();

   contacts: Contact[] = [];
   maxContactId: number;
   
   constructor() {
   this.contacts = MOCKCONTACTS;
   this.maxContactId = this.getMaxId();
   }

   getContacts() {
      return this.contacts.slice();
   }

   getContact(id: string) {
      for (let contact of this.contacts) {
         if(contact.id == id) {
            return contact;
         } 
      }
   }

   deleteContact(contact: Contact) {
      if (contact == undefined || null) {
         return;
      } 

      let pos = this.contacts.indexOf(contact);
      if (pos < 0) {
         return;
      } 

      this.contacts.splice(pos, 1);
      let contactsListClone = this.contacts.slice();
      this.contactChangedEvent.next(contactsListClone);
   }

   addContact(newContact: Contact) {
      if (newContact == undefined || null) {
         return;
      }
  
      this.maxContactId++
      newContact.id = this.maxContactId.toString();
      this.contacts.push(newContact);
      let contactsListClone = this.contacts.slice();
      this.contactChangedEvent.next(contactsListClone);
    }
  
  
    updateContact(originalContact: Contact, newContact: Contact) {
      if (originalContact || newContact == undefined || null) {
        return;
      } 
  
      let pos = this.contacts.indexOf(originalContact);
      if (pos < 0) {
        return;
      } 
  
      newContact.id = originalContact.id;
      this.contacts[pos] = newContact;
      let documentsListClone = this.contacts.slice();
      this.contactChangedEvent.next(documentsListClone);
   }

   getMaxId(): number {
      let maxId = 0;
      for (let document of this.contacts) {
         let currentId = +document.id;
         if (currentId > maxId) {
         maxId = currentId;
         } 
      }
      return maxId;
   }


}