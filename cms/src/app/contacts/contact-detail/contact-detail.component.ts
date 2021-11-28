import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  @Input() contact: Contact;
  id: string;

  constructor(private contactService: ContactService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => { 
        this.id = params['id'];
        this.contact = this.contactService.getContact(this.id);
      }
    );
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);
 }
  onDeleteGroupContact(id: string) {
    this.contact.group = this.contact.group.filter(element => element.id != id);
    this.contactService.updateContact(this.contact, this.contact)
    this.contactService.liveUpdateContacts();
  }
}
