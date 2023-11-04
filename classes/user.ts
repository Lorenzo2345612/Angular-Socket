export class User {
    public id: string;
    public name?: string;
    public room?: string;

    constructor(id: string, name?: string, room?: string){
        this.id = id;
        this.name = name;
        this.room = room;
    }
}