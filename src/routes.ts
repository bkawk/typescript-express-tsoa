import { Router, Request, Response } from 'express';
import * as path from "path";

const router: Router = Router();


router.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

router.get('/is/:name', (req: Request, res: Response) => {
    let { name } = req.params;
    res.send(`Hello, ${name}`);
});

router.get("/socket", (req: any, res: any) => {
    res.sendFile(path.resolve("./src/client/index.html"));
  });

  
export = router;