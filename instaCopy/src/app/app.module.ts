import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';
import { UserInfoComponent } from './profile/user-info/user-info.component';
import { ImageListComponent } from './profile/image-list/image-list.component';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { HeaderComponent } from './header/header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ImageItemComponent } from './profile/image-item/image-item.component';


@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    ProfileComponent,
    PostComponent,
    UserInfoComponent,
    ImageListComponent,
    PostCreateComponent,
    PostDetailComponent,
    HeaderComponent,
    DropdownDirective,
    ImageItemComponent,
    ImageListComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
