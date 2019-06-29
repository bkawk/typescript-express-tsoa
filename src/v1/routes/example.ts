import { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

const router: Router = Router();

router.post('/', [
    check('username').isEmail(),
    check('password').isLength({ min: 5 })
    ],(req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      res.send('Hello, World!');
});

export = router;




// router.get('/', (req: Request, res: Response) => {
//     res.send('Hello, World!');
// });

// router.get('/is/:name', (req: Request, res: Response) => {
//     let { name } = req.params;
//     res.send(`Hello, ${name}`);
// });

// router.get("/socket", (req: any, res: any) => {
//     res.sendFile(path.resolve("./src/client/index.html"));
//   });




  