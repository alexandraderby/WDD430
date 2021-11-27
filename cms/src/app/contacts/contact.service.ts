import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

   contactSelectedEvent = new EventEmitter<Contact>();
   contactChangedEvent = new Subject<Contact[]>();

   contacts: Contact[] = [];
   maxContactId: number;
   
   constructor(private http: HttpClient) {
   //this.contacts = MOCKCONTACTS;
   this.maxContactId = this.getMaxId();
   }

   // getContacts() {
   //    return this.contacts.slice();
   // }

   getContacts() {
      return this.http.get<Contact[]>('http://localhost:3000/contacts')
        .subscribe(
          (contacts: Contact[]) => {
            this.contacts = contacts;
            this.contacts  = JSON.parse(JSON.stringify(this.contacts)).contacts
            this.maxContactId = this.getMaxId();
            this.contacts.sort((a,b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            });
          let contactListCopy = this.contacts.slice();
          this.contactChangedEvent.next(contactListCopy);
        },
        (error: any) => {
          console.log(error);
        } 
      )
    }

   getContact(id: string) {
      for (let contact of this.contacts) {
         if(contact.id == id) {
            return contact;
         } 
      }
   }

   // deleteContact(contact: Contact) {
   //    if (!contact) {
   //       return;
   //    } 

   //    let pos = this.contacts.indexOf(contact);
   //    if (pos < 0) {
   //       return;
   //    } 

   //    this.contacts.splice(pos, 1);
   //    let contactsListClone = this.contacts.slice();
   //    this.contactChangedEvent.next(contactsListClone);
   // }

   deleteContact(contact: Contact) {

      if (!contact) {
        return;
      }
  
      const pos = this.contacts.findIndex(d => d.id === contact.id);
  
      if (pos < 0) {
        return;
      }
  
      // delete from database
      this.http.delete('http://localhost:3000/contacts' + contact.id)
        .subscribe(
          (response: Response) => {
            this.contacts.splice(pos, 1);
            this.liveUpdateContacts();
          }
        );
        
    }

   // addContact(newContact: Contact) {
   //    if (!newContact) {
   //       return;
   //    }
  
   //    this.maxContactId++
   //    newContact.id = this.maxContactId.toString();
   //    this.contacts.push(newContact);
   //    let contactsListClone = this.contacts.slice();
   //    this.contactChangedEvent.next(contactsListClone);
   //  }

   liveUpdateContacts() {
      this.contactChangedEvent.next(this.contacts.slice());
    }

   addContact(contact: Contact) {
      if (!contact) {
        return;
      }
    
      // make sure id of the new Document is empty
      contact.id = '';
    
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
      // add to database
      this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
        contact,
        { headers: headers })
        .subscribe(
          (responseData) => {
            // add new document to documents
            this.contacts.push(responseData.contact);
            this.liveUpdateContacts();
          }
        );
    }
  
  
   //  updateContact(originalContact: Contact, newContact: Contact) {
   //    if (!originalContact || !newContact) {
   //      return;
   //    } 
  
   //    let pos = this.contacts.indexOf(originalContact);
   //    if (pos < 0) {
   //      return;
   //    } 
  
   //    newContact.id = originalContact.id;
   //    this.contacts[pos] = newContact;
   //    let contactsListClone = this.contacts.slice();
   //    this.contactChangedEvent.next(contactsListClone);
   // }

   updateContact(originalContact: Contact, newContact: Contact) {
      if (!originalContact || !newContact) {
        return;
      }
  
      const pos = this.contacts.findIndex(d => d.id === originalContact.id);
  
      if (pos < 0) {
        return;
      }
  
      // set the id of the new Contact to the id of the old Document
      newContact.id = originalContact.id;
  
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
      // update database
      this.http.put('http://localhost:3000/contacts' + originalContact.id,
      newContact, { headers: headers })
        .subscribe(
          (response: Response) => {
            this.contacts[pos] = newContact;
            this.liveUpdateContacts();
          }
        );
    }

   getMaxId(): number {
      let maxId = 0;
      for (let contact of this.contacts) {
         let currentId = +contact.id;
         if (currentId > maxId) {
         maxId = currentId;
         } 
      }
      return maxId;
   }


}