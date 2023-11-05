import { Router, Request, Response } from 'express';
import {  RemoteSocket } from 'socket.io';
import Server from '../classes/server';
import { connectedUsers } from '../sockets/sockets';

export const router = Router();

router.get('/mensajes', (req: Request, res: Response)=>{
    res.json({
        ok: true,
        mensaje: 'Todo esta bien bien!!'
    })
});

router.post('/mensajes', (req: Request, res: Response) => {
    
    const body = req.body.cuerpo;
    const from = req.body.de;

    const payload = {
        from,
        body
    }

    const server: Server = Server.instance;

    server.io.emit('new-message', payload);
    
    res.json({
        ok: true,
        body,
        from
    })
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
    
    const body = req.body.cuerpo;
    const from = req.body.de;
    const id = req.params.id;

    const payload = {
        from,
        body
    };

    const server: Server = Server.instance;

    server.io.in( id ).emit('private-messages', payload)
    
    res.json({
        ok: true,
        body,
        from,
        id
    })
});


// User list service

router.get('/users', (req: Request, res: Response) => {
    const server = Server.instance;

    server.io.fetchSockets().then(
        (clients) => {
            const clientIds = clients.map(client => client.id);
            res.json({
                ok: true,
                clientIds
            })
        }
    ).catch(
        (err) => {
            res.json({
                ok: false,
                err
            })
        }
    )
})

// Get users
router.get('/users/details', (req: Request, res: Response) =>{
    res.json(
        {
            ok: true,
            clients: connectedUsers.userList
        }
    );
});