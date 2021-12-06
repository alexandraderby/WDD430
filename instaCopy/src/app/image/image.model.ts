import { User } from "../user/user.model"
import { Like } from "../like/like.model"
import { Comment } from "../comment/comment.model"

export class Image {
    public id: string;
    public url: Image;
    public caption: Image;
    public user: User;
    public likes: Like[];
    public comments: Comment[];

    constructor(id: string, url: Image, caption: Image, user: User, likes: Like[], comments: Comment[]) {
        this.id = id;
        this.url = url;
        this.caption = caption;
        this.user = user;
        this.likes = likes;
        this.comments = comments;
    }
}