import { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import register from '../controllers/register';

const router: Router = Router();

router.post('/user', [
    check('email').isEmail(),
    check('password').isLength({ min: 5 }),
    ], async (req: Request, res: Response) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        } else {
          const data = await register.registerUserController(req);
          res.send(data);
        }
      } catch (err) {
        res.send(err);
      }
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
