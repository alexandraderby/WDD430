import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FeedComponent } from "./feed/feed.component";
import { PostCreateComponent } from "./post/post-create/post-create.component";
import { PostDetailComponent } from "./post/post-detail/post-detail.component";
import { PostComponent } from "./post/post.component";
import { ImageDetailComponent } from "./profile/image-detail/image-detail.component";
import { ImageEditComponent } from "./profile/image-edit/image-edit.component";

import { ProfileComponent } from "./profile/profile.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/profile', pathMatch: 'full' },
    { path: 'profile', component: ProfileComponent, children: [
        { path: 'newpost', component: PostCreateComponent},
        { path: 'imagedetail/:id', component: ImageDetailComponent},
        { path: 'imagedetail/:id/edit', component: ImageEditComponent}
    ] },
    // { path: 'post', component: PostComponent, children: [
    //     { path: ':id', component: PostDetailComponent },
    //     { path: ':id/edit', component: PostCreateComponent}
    // ] },
    { path: 'feed', component: FeedComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}