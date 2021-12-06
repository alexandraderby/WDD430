import { Image } from "../image/image.model"
import { User } from "../user/user.model"

export class Comment {
    public id: string;
    public text: string;
    public image: Image;
    public user: User;

    constructor(id: string, text: string, image: Image, user: User) {
        this.id = id;
        this.text = text;
        this.image = image;
        this.user = user;
    }
}