import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FeedComponent } from "./feed/feed.component";

import { ProfileComponent } from "./profile/profile.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/profile', pathMatch: 'full' },
    { path: 'profile', component: ProfileComponent, children: [
        // { path: 'new', component: DocumentEditComponent},
        // { path: ':id', component: DocumentDetailComponent },
        // { path: ':id/edit', component: DocumentEditComponent}
    ] },

    { path: 'feed', component: FeedComponent, children: [
        // { path: 'new', component: ContactEditComponent},
        // { path: ':id', component: ContactDetailComponent },
        // { path: ':id/edit', component: ContactEditComponent}
    ] }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}