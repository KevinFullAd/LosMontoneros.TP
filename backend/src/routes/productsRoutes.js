import { Router } from 'express';
import { listProducts, getProductById } from '../controllers/productsController.js';

const router = Router();

// Catálogo público
router.get('/', listProducts);        // GET /api/productos
router.get('/:id', getProductById);     // GET /api/productos/:id

export default router;
