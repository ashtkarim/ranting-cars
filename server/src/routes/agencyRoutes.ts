import { Router } from 'express';
import * as agancy from '../Controllers/AgancyControllers';

const agancyRoutes = Router();

agancyRoutes.get('/', agancy.getAgencies);
// agancyRoutes.get('/:id',agancy.getAgancyById)

export default agancyRoutes;