// backend/src/routes/adminViewRoutes.js 
import { Router } from "express";
import authAdminView from "../middlewares/authAdminView.js";

// Controladores
import { login, logout } from "../controllers/adminController.js"; // login backend
import {
  renderLogin,
  renderDashboard,
  renderProductoForm,
  cargarProducto,
  renderVentas,
  renderUsuarios,
  renderUsuarioForm,
  renderEditarAdmin, // ✅ este estaba faltando
} from "../controllers/adminViewController.js";

import {
  crearAdmin,
  actualizarAdmin,
  eliminarAdmin,
} from "../controllers/adminController.js"; // ✅ las acciones CRUD reales vienen de aquí

const router = Router();

// Redirige al login por defecto
router.get("/", (req, res) => res.redirect("/admin/login"));

// 🟢 Login público
router.get("/login", renderLogin);
router.post("/login", login);

// 🔒 A partir de acá, todas las rutas requieren sesión
router.use(authAdminView);

// Vistas protegidas
router.get("/dashboard", renderDashboard);
router.get("/logout", logout);

// Productos
router.get("/productos/nuevo", renderProductoForm);
router.get("/productos/:id/editar", cargarProducto, renderProductoForm);

// Ventas
router.get("/ventas", renderVentas);

// Usuarios administradores
router.get("/usuarios", renderUsuarios);
router.get("/usuarios/nuevo", renderUsuarioForm);
router.get("/usuarios/:id/editar", renderEditarAdmin);
router.post("/usuarios", crearAdmin);
router.post("/usuarios/:id", actualizarAdmin);
router.delete("/usuarios/:id", eliminarAdmin);

export default router;
