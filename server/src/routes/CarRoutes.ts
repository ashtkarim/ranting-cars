import express from 'express';
import * as carController from '../Controllers/CarControllers';
import { authenticateToken ,authorizeCarOwner} from '../middleware/auth';

const router = express.Router();
router.get('/mycars',authenticateToken,carController.getMyCars)
router.post('/', authenticateToken, carController.createCar);
router.get('/', carController.getAllCars);
router.get('/:id', carController.getCarById);
router.put('/:id', authenticateToken, authorizeCarOwner, carController.updateCar);
router.delete('/:id', authenticateToken, authorizeCarOwner, carController.deleteCar);

export default router;