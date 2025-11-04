/*
import { Router } from 'express';
import { 
    listProducts, 
    getProduct, 
    createProduct, 
    updateProduct, 
    toggleProducto 
} from '../controllers/productsController.js';

const router = Router();

// Catálogo público
router.get('/', listProducts);        // GET /api/productos
router.get('/:id', getProduct);       // GET /api/productos/:id

// Administración (CRUD)
router.post('/', createProduct);      // POST /api/productos
router.put('/:id', updateProduct);    // PUT /api/productos/:id
router.patch('/:id/toggle', toggleProducto); // PATCH /api/productos/:id/toggle

export default router;
*/
import { Router } from 'express';
import { listProducts, getProduct } from '../controllers/productsController.js';

const router = Router();

// Catálogo público
router.get('/', listProducts);        // GET /api/productos
router.get('/:id', getProduct);       // GET /api/productos/:id

export default router;