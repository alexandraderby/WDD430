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


  addUser(user: User) {
    if (!user) {
      return;
    }

    // make sure id of the new User is empty
    user.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, user: User }>('http://localhost:3030/users',
      user,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new user to users
          this.users.push(responseData.user);
          this.liveUpdateUsers();
        }
      );
  }

  updateUser(originalUser: User, newUser: User) {
    if (!originalUser || !newUser) {
      return;
    }

    const pos = this.users.findIndex(d => d.id === originalUser.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new User to the id of the old User
    newUser.id = originalUser.id;

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


