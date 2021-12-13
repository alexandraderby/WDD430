import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/post/post.model';
import { FeedService } from '../feed.service';

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.css']
})
export class FeedItemComponent implements OnInit {
  @Input() post: Post;

  constructor(private feedService: FeedService) { }

  ngOnInit(): void {
  }

}
