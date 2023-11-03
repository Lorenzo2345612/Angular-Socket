import express from 'express';
import { SERVER_PORT } from '../global/environment'

export default class Server {
    public app: express.Application;
    public port: number;

    constructor(port: number = SERVER_PORT){
        this.app = express();
        this.port = port;
    }

    start(callback: () => void){
        this.app.listen(this.port, callback);
    }
}