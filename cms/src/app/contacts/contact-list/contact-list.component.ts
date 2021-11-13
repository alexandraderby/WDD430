import { Component, OnInit, OnDestroy, EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {

  contactSelectedEvent = new EventEmitter<Contact>();
  term: string;
  contacts: Contact[] = [];
  private contactListChangedSubscription: Subscription;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();

    this.contactListChangedSubscription = this.contactService.contactChangedEvent
    .subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
  }

  onContactSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }

  search(value: string) {
    this.term = value;
  }

  ngOnDestroy() {
    this.contactListChangedSubscription.unsubscribe();

  }

}
