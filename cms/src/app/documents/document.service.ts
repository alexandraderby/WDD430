import { Injectable, EventEmitter } from "@angular/core";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";
import { Document } from "./document.model";
import { Subject } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class DocumentService {

  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  documents: Document[] = [];
  maxDocumentId: number;

  constructor(private httpClient: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    return this.httpClient.get<Document[]>('https://cms-database-aafd8-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        (documents: Document[] ) => {
          this.documents = documents
          this.maxDocumentId = this.getMaxId()
          this.documents.sort((a,b) => {
            if (a > b) return 1;
            if (a < b) return -1;
          return 0;
          })
        let documentListCopy = this.documents.slice();
        this.documentListChangedEvent.next(documentListCopy);
      },
      (error: any) => {
        console.log(error);
      } 
    )
  }
  // OLD
  // getDocuments() {
  //   return this.documents.slice();
  // }

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
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }


  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
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
    if (!document) {
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


