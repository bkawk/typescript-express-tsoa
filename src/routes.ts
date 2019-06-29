import { Router, Request, Response } from 'express';
import * as path from "path";
const router: Router = Router();

import * as example from './v1/routes/example'
router.use('/api/v1/example', example);

export = router;