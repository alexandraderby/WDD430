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
    return this.http.get<Document[]>('http://localhost:3000/documents')
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.documents  = JSON.parse(JSON.stringify(this.documents)).documents
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
        this.documentListChangedEvent.next(documentListCopy);
      },
      (error: any) => {
        console.log(error);
      } 
    )
  }

  liveUpdateDocuments() {
    this.documentListChangedEvent.next(this.documents.slice());
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

  // addDocument(newDocument: Document) {
  //   if (!newDocument) {
  //     return;
  //   }

  //   this.maxDocumentId++
  //   newDocument.id = this.maxDocumentId.toString();
  //   this.documents.push(newDocument);
  //   this.storeDocuments();
  // }

addDocument(document: Document) {
  if (!document) {
    return;
  }

  // make sure id of the new Document is empty
  document.id = '';

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // add to database
  this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
    document,
    { headers: headers })
    .subscribe(
      (responseData) => {
        // add new document to documents
        this.documents.push(responseData.document);
        this.liveUpdateDocuments();
      }
    );
}


  // updateDocument(originalDocument: Document, newDocument: Document) {
  //   if (!originalDocument || !newDocument) {
  //     return;
  //   } 

  //   let pos = this.documents.indexOf(originalDocument);
  //   if (pos < 0) {
  //     return;
  //   } 

  //   newDocument.id = originalDocument.id;
  //   this.documents[pos] = newDocument;
  //   this.storeDocuments();
  // }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    //newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.liveUpdateDocuments();
        }
      );
  }

  // deleteDocument(document: Document) {
  //   if (!document) {
  //     return;
  //   } 

  //   let pos = this.documents.indexOf(document);
  //   if (pos < 0) {
  //     return;
  //   } 

  //   this.documents.splice(pos, 1);
  //   this.storeDocuments();
  // }

  deleteDocument(document: Document) {

    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.liveUpdateDocuments();
        }
      );
      
  }

  
}


