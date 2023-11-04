import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UserList } from '../classes/user-list';
import { User } from '../classes/user';

export const connectedUsers = new UserList();

export const connectClient = (client: Socket) => {
    const user = new User(client.id);
    
    connectedUsers.add(user);
}

export const disconnect = (client: Socket) =>{
    client.on('disconnect', () =>{
        connectedUsers.deleteUser(client.id);
    });
}

// Listen Messages
export const message = (client: Socket, io: socketIO.Server) =>{
    client.on('message', (payload: {from: string, body: string}) =>{
        console.log(payload.body);

        io.emit('new-message', payload);
    });
}


// Listen Logins
export const login = (client: Socket, io: socketIO.Server) => {
    client.on('configurate-user', (payload: { name : string}, callback: Function) => {
        connectedUsers.updateName(client.id, payload.name);

        callback({
            ok: true,
            message: `User ${payload.name}, configured`
        })
    });
}