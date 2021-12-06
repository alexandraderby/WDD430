import { User } from "../user/user.model"
import { Image } from "../image/image.model"

export class Post {
    public user: User;
    public image: Image;
    constructor(user: User, image: Image) {
        this.user = user
        this.image = image
    }
}
