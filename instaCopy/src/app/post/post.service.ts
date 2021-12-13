import { Injectable } from '@angular/core';
import { ImageService } from '../image/image.service';
import { UserService } from '../user/user.service';
import { Post } from './post.model';
import { User } from '../user/user.model';
import { Image } from '../image/image.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postListChangedEvent = new Subject<Post[]>();

  users: User[] = [];
  images: Image[] = [];
  posts: Post[] = [];

  constructor(
    private userService: UserService,
    private imageService: ImageService
  ) { }

  getPosts() {
    this.userService.getUsers();
    this.userService.userListChangedEvent.subscribe(users => {
      this.users = users
      this.makePosts()
    });
    this.imageService.getImages();
    this.imageService.imageListChangedEvent.subscribe(images => {
      this.images = images
      this.makePosts()
    });
  }
  
  makePosts() {
    // when images and users are both ready, make post list
    if (this.images.length && this.users.length) {
      this.images.forEach(image => {
        this.posts.push(this.makePost(image))
      })
      let postListCopy = this.posts.slice();
      this.postListChangedEvent.next(postListCopy);
    }
  }

  makePost(image: Image) : Post{
    for (let user of this.users) {
        if(user.id == image.user) {
          return new Post(user, image);
        } 
    }
  }


}
