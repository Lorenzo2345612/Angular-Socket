import { Router, Request, Response } from 'express';

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
    
    res.json({
        ok: true,
        body,
        from,
        id
    })
});