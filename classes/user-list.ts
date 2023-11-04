import { User } from "./user";

export class UserList {
    private list: User[] = [];

    constructor(){}

    // Add User.
    public add(user: User){
        this.list.push(user);
        console.log(this.list);
        return user;
    }

    public updateName(id: string, name: string){
        for (let user of this.list){
            if (user.id === id){
                user.name = name;
                break;
            }
        }
        console.log(this.list);
    }

    public get userList() {
        return this.list;
    } 

    public getUser(id: string){
        return this.list.find(user => user.id === id);
    }

    public getUserInRoom(room: string) {
        return this.list.filter(user => user.room === room);
    }

    public deleteUser(id: string){
        const tempUser = this.getUser(id);
        this.list = this.list.filter(user => user.id !== id);
        
        console.log(this.list);
        return tempUser;
    }
}