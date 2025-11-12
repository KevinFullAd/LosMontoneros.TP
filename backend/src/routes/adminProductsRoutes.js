import { Router } from "express";
import authAdminView from "../middlewares/authAdminView.js";
import {
  crearProducto,
  actualizarProducto,
  toggleProductoActivo,
  eliminarProducto
} from "../controllers/adminController.js";

const router = Router();

// Todas requieren sesión admin
router.use(authAdminView);

// Crear nuevo producto
router.post("/productos", crearProducto);

// Actualizar producto existente
router.put("/productos/:id", actualizarProducto);

// Activar/desactivar producto
router.patch("/productos/:id/toggle", toggleProductoActivo);

// Eliminar producto
router.delete("/productos/:id", eliminarProducto);

export default router;
