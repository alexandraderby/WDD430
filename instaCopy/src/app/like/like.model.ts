
export class Like {
    public id: string;
    public image: string;
    public user: string;

    constructor(id: string, image: string, user: string) {
        this.id = id;
        this.image = image;
        this.user = user;
    }
}