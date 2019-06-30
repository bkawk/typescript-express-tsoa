import { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { UserModel } from '../models/user';

const router: Router = Router();

router.post('/register', [
    check('email').isEmail(),
    check('password').isLength({ min: 5 })
    ], async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      } else {
        const email = req.body['email'];
        const password = req.body['password'];
        const user = new UserModel({email, password});
        await user.save()
        res.end();
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




  