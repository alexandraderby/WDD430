import { Injectable, EventEmitter } from "@angular/core";
import { Comment } from "./comment.model"; 
import { Observable, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class CommentService {

  commentSelectedEvent = new EventEmitter<Comment>();
  commentListChangedEvent = new Subject<Comment[]>();

  comments: Comment[] = [];
  maxCommentId: number;

  constructor(private http: HttpClient) {
    this.maxCommentId = this.getMaxId();
  }

  getComments() {
    return this.http.get<Comment[]>('http://localhost:3030/comments')
      .subscribe(
        (comments: Comment[]) => {
          this.comments = comments;
          this.comments  = JSON.parse(JSON.stringify(this.comments)).comments
          this.maxCommentId = this.getMaxId();
          this.comments.sort((a,b) => {
            if (a.id > b.id) {
              return 1;
            }
            if (a.id < b.id) {
              return -1;
            }
            return 0;
          });
        let commentListCopy = this.comments.slice();
        this.commentListChangedEvent.next(commentListCopy);
      },
      (error: any) => {
        console.log(error);
      } 
    )
  }

  liveUpdateComments() {
    this.commentListChangedEvent.next(this.comments.slice());
  }

  getComment(id: string) {
    for (let comment of this.comments) {
        if(comment.id == id) {
          return comment;
        } 
    }
  }

  getMaxId(): number {
    let maxId = 0;
    for (let comment of this.comments) {
      let currentId = +comment.id;
      if (currentId > maxId) {
        maxId = currentId;
      } 
    }
    return maxId;
   }

addComment(comment: Comment) {
  if (!comment) {
    return;
  }

  // make sure id of the new Comment is empty
  comment.id = '';

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // add to database
  this.http.post<{ message: string, comment: Comment }>('http://localhost:3030/comments',
    comment,
    { headers: headers })
    .subscribe(
      (responseData) => {
        // add new comment to comments
        this.comments.push(responseData.comment);
        this.liveUpdateComments();
      }
    );
}

  updateComment(originalComment: Comment, newComment: Comment) {
    if (!originalComment || !newComment) {
      return;
    }

    const pos = this.comments.findIndex(d => d.id === originalComment.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new comment to the id of the old comment
    newComment.id = originalComment.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3030/comments/' + originalComment.id,
      newComment, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.comments[pos] = newComment;
          this.liveUpdateComments();
        }
      );
  }

  deleteComment(comment: Comment) {

    if (!comment) {
      return;
    }

    const pos = this.comments.findIndex(d => d.id === comment.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3030/comments/' + comment.id)
      .subscribe(
        (response: Response) => {
          this.comments.splice(pos, 1);
          this.liveUpdateComments();
        }
      );
      
  }

  
}


