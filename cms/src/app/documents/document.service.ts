import { Injectable, EventEmitter } from "@angular/core";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";
import { Document } from "./document.model";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class DocumentService {

    documentSelectedEvent = new EventEmitter<Document>();
    documentChangedEvent = new Subject<Document[]>();

    documents: Document[] = [];

    constructor() {
      this.documents = MOCKDOCUMENTS;
    }

    getDocuments() {
        return this.documents.slice();
    }

    getDocument(id: string) {
        for (let document of this.documents) {
            if(document.id == id) {
             return document;
            } 
        }
     }

     deleteDocument(document: Document) {
      if (!document) {
         return;
      }
      const pos = this.documents.indexOf(document);
      if (pos < 0) {
         return;
      }
      this.documents.splice(pos, 1);
      this.documentChangedEvent.next(this.documents.slice());
   }
}

