import { Injectable, EventEmitter } from "@angular/core";
import { Document } from "./document.model";
import { Observable, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class DocumentService {

  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  documents: Document[] = [];
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    return this.http.get<Document[]>('https://cms-database-aafd8-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        (documents: Document[]) => {
          //console.log('The get request has received data')
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a,b) => {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            return 0;
          });
        let documentListCopy = this.documents.slice();
        //console.log('The get request is announcing to whoever is listening that the document list has changed/ get request has received data')
        this.documentListChangedEvent.next(documentListCopy);
      },
      (error: any) => {
        console.log(error);
      } 
    )
  }

  storeDocuments() {
    let jsonDocuments = JSON.stringify(this.documents);
    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    this.http.put('https://cms-database-aafd8-default-rtdb.firebaseio.com/documents.json', jsonDocuments, options)
      .subscribe(
        () => {
          this.documentListChangedEvent.next(this.documents.slice());
        }
      );
  }

  // can pass to subscribe instead of the fat arrow function
  // updateSuccess() {
  //   this.documentListChangedEvent.next(this.documents.slice());
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
    this.storeDocuments();
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
    this.storeDocuments();
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
    this.storeDocuments();
  }


  
}


