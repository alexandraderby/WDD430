import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './feed/post/post.component';
import { UserInfoComponent } from './profile/user-info/user-info.component';
import { ImageListComponent } from './profile/image-list/image-list.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { PostCreateComponent } from './post/post-create/post-create.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    ProfileComponent,
    PostComponent,
    UserInfoComponent,
    ImageListComponent,
    PostDetailComponent,
    PostCreateComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
