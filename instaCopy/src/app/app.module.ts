import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

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
import { ImageDetailComponent } from './profile/image-detail/image-detail.component';
import { FeedItemComponent } from './feed/feed-item/feed-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageEditComponent } from './profile/image-edit/image-edit.component';


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
    ImageListComponent,
    ImageDetailComponent,
    FeedItemComponent,
    ImageEditComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
