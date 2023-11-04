import { Router, Request, Response } from 'express';
import Server from '../classes/server';

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