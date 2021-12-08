import { Injectable, EventEmitter } from "@angular/core";
import { User } from "./user.model"; 
import { Observable, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class UserService {

  userSelectedEvent = new EventEmitter<User>();
  userListChangedEvent = new Subject<User[]>();

  users: User[] = [];
  maxUserId: number;

  constructor(private http: HttpClient) {
    this.maxUserId = this.getMaxId();
  }

  getUsers() {
    return this.http.get<User[]>('http://localhost:3030/users')
      .subscribe(
        (users: User[]) => {
          this.users = users;
          this.users  = JSON.parse(JSON.stringify(this.users)).users
          this.maxUserId = this.getMaxId();
          this.users.sort((a,b) => {
            if (a.id > b.id) {
              return 1;
            }
            if (a.id < b.id) {
              return -1;
            }
            return 0;
          });
        let userListCopy = this.users.slice();
        this.userListChangedEvent.next(userListCopy);
      },
      (error: any) => {
        console.log(error);
      } 
    )
  }

  liveUpdateUsers() {
    this.userListChangedEvent.next(this.users.slice());
  }

  // can pass to subscribe instead of the fat arrow function
  // updateSuccess() {
  //   this.documentListChangedEvent.next(this.documents.slice());
  // }

  getUser(id: string) {
    for (let user of this.users) {
        if(user.id == id) {
          return user;
        } 
    }
  }

  getMaxId(): number {
    let maxId = 0;
    for (let user of this.users) {
      let currentId = +user.id;
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

addUser(user: User) {
  if (!user) {
    return;
  }

  // make sure id of the new Document is empty
  user.id = '';

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // add to database
  this.http.post<{ message: string, user: User }>('http://localhost:3030/users',
    user,
    { headers: headers })
    .subscribe(
      (responseData) => {
        // add new document to documents
        this.users.push(responseData.user);
        this.liveUpdateUsers();
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

  updateUser(originalUser: User, newUser: User) {
    if (!originalUser || !newUser) {
      return;
    }

    const pos = this.users.findIndex(d => d.id === originalUser.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newUser.id = originalUser.id;
    //newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3030/users/' + originalUser.id,
      newUser, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.users[pos] = newUser;
          this.liveUpdateUsers();
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

  deleteUser(user: User) {

    if (!user) {
      return;
    }

    const pos = this.users.findIndex(d => d.id === user.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3030/users/' + user.id)
      .subscribe(
        (response: Response) => {
          this.users.splice(pos, 1);
          this.liveUpdateUsers();
        }
      );
      
  }

  
}


