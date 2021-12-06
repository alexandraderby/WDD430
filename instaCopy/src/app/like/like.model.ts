import { Image } from "../image/image.model"
import { User } from "../user/user.model"

export class Like {
    public id: string;
    public image: Image;
    public user: User;

    constructor(id: string, image: Image, user: User) {
        this.id = id;
        this.image = image;
        this.user = user;
    }
}