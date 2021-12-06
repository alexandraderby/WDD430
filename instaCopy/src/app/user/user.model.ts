import { Image } from "../image/image.model"

export class User {
    public id: string;
    public username: string;
    public profilePictureUrl: string;
    public images: Image[];

    constructor(id: string, username: string, profilePictureUrl: string, images: Image[]) {
        this.id = id;
        this.username = username;
        this.profilePictureUrl = profilePictureUrl;
        this.images = images;
    }
}