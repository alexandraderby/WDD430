import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

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

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) {

}

ngOnInit() {
  this.route.params
  .subscribe (
    (params: Params) => {
      let id = this.document.id;
        if (!id) {
          this.editMode = false;
          return;
        }
      this.originalDocument = this.documentService.getDocument(id);
  
      if (!this.originalDocument) {
        return;
      }
      this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
  }) 
}

  onCancel() {
    console.log("test");
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newDocument = new Document(value.id, value.name, value.description, value.url, value.children);
    if (this.editMode == true) {
      this.documentService.updateDocument(this.originalDocument, newDocument)
    }
    else {
      this.documentService.addDocument(newDocument)
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
