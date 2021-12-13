import { Injectable, EventEmitter } from "@angular/core";
import { Like } from "./like.model"; 
import { Observable, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class LikeService {

  likeSelectedEvent = new EventEmitter<Like>();
  likeListChangedEvent = new Subject<Like[]>();

  likes: Like[] = [];
  maxLikeId: number;

  constructor(private http: HttpClient) {
    this.maxLikeId = this.getMaxId();
  }

  getLikes() {
    return this.http.get<Like[]>('http://localhost:3030/likes')
      .subscribe(
        (likes: Like[]) => {
          this.likes = likes;
          this.likes  = JSON.parse(JSON.stringify(this.likes)).likes
          this.maxLikeId = this.getMaxId();
          this.likes.sort((a,b) => {
            if (a.id > b.id) {
              return 1;
            }
            if (a.id < b.id) {
              return -1;
            }
            return 0;
          });
        let likeListCopy = this.likes.slice();
        this.likeListChangedEvent.next(likeListCopy);
      },
      (error: any) => {
        console.log(error);
      } 
    )
  }

  liveUpdateLikes() {
    this.likeListChangedEvent.next(this.likes.slice());
  }


  getLike(id: string) {
    for (let like of this.likes) {
        if(like.id == id) {
          return like;
        } 
    }
  }

  getMaxId(): number {
    let maxId = 0;
    for (let like of this.likes) {
      let currentId = +like.id;
      if (currentId > maxId) {
        maxId = currentId;
      } 
    }
    return maxId;
   }

addLike(like: Like) {
  if (!like) {
    return;
  }

  // make sure id of the new Like is empty
  like.id = '';

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // add to database
  this.http.post<{ message: string, like: Like }>('http://localhost:3030/likes',
    like,
    { headers: headers })
    .subscribe(
      (responseData) => {
        // add new like to likes
        this.likes.push(responseData.like);
        this.liveUpdateLikes();
      }
    );
}

  updateLike(originalLike: Like, newLike: Like) {
    if (!originalLike || !newLike) {
      return;
    }

    const pos = this.likes.findIndex(d => d.id === originalLike.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new like to the id of the old like
    newLike.id = originalLike.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3030/likes/' + originalLike.id,
      newLike, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.likes[pos] = newLike;
          this.liveUpdateLikes();
        }
      );
  }


  deleteLike(like: Like) {

    if (!like) {
      return;
    }

    const pos = this.likes.findIndex(d => d.id === like.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3030/likes/' + like.id)
      .subscribe(
        (response: Response) => {
          this.likes.splice(pos, 1);
          this.liveUpdateLikes();
        }
      );
      
  }

  
}


