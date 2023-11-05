import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UserList } from '../classes/user-list';
import { User } from '../classes/user';

export const connectedUsers = new UserList();

export const connectClient = (client: Socket, io: socketIO.Server) => {
    const user = new User(client.id);
    
    connectedUsers.add(user);
}

export const disconnect = (client: Socket, io: socketIO.Server) =>{
    client.on('disconnect', () =>{
        connectedUsers.deleteUser(client.id);
    });

    io.emit('connected-users', connectedUsers.userList);
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
        connectedUsers.updateName(client.id, payload.name===''? undefined :payload.name);

        io.emit('connected-users', connectedUsers.userList);
        callback({
            ok: true,
            message: `User ${payload.name}, configured`
        })
    });
}

// Get connected users
export const getConnectedUsers = (client: Socket, io: socketIO.Server) => {
    client.on('get-connected-users', () => {
        io.to(client.id).emit('connected-users', connectedUsers.userList);
    })
}