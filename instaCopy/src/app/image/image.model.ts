
export class Image {
    public id: string;
    public url: Image;
    public caption: Image;
    public user: string;
    public likes: string[];
    public comments: string[];

    constructor(id: string, url: Image, caption: Image, user: string, likes: string[], comments: string[]) {
        this.id = id;
        this.url = url;
        this.caption = caption;
        this.user = user;
        this.likes = likes;
        this.comments = comments;
    }
}