import express from 'express';
import { SERVER_PORT } from '../global/environment'
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';

export default class Server {
    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor(port: number = SERVER_PORT){
        this.app = express();
        this.port = port;
        this.httpServer = http.createServer(this.app);
        this.io = new socketIO.Server( this.httpServer , {
            cors: {
                origin: '*',
            }
        });
    
        this.listenSockets();
    }

    public static get instance(){
        return this._instance || ( this._instance = new this() );
    }

    private listenSockets(){
        console.log('Listening Sockets');

        this.io.on('connection', client =>{

            // Connect Client
            socket.connectClient( client, this.io );

            // Login
            socket.login(client, this.io);
            
            // emmiters
            socket.getConnectedUsers(client, this.io);

            socket.message(client, this.io);

            // Disconnect
            socket.disconnect(client, this.io);
        });
    }

    start(callback: () => void){
        this.httpServer.listen(this.port, callback);
    }
}