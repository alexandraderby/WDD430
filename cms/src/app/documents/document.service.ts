import { Injectable, EventEmitter } from "@angular/core";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";
import { Document } from "./document.model";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class DocumentService {

  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  documents: Document[] = [];
  maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
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

  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents) {
      let currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      } 
    }
    return maxId;
   }

  addDocument(newDocument: Document) {
    if (newDocument == undefined || null) {
      return;
    }

    this.maxDocumentId++
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }


  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument || newDocument == undefined || null) {
      return;
    } 

    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    } 

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  deleteDocument(document: Document) {
    if (document == undefined || null) {
      return;
    } 

    let pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    } 

    this.documents.splice(pos, 1);
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }
  
}


