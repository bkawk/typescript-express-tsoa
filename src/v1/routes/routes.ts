import { Router } from 'express';
import * as path from "path";
const router: Router = Router();

import * as register from './register';
router.use('/api/v1/register', register);

export = router;
