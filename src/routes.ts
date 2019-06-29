import { Router, Request, Response } from 'express';
import * as path from "path";
// import * as exampleRoute from './v1/routes/example'

const router: Router = Router();


// const exampleRoute = require('./v1/routes/example.js');
// router.use('/api/v1/example', exampleRoute);


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