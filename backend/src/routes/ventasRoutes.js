import { Router } from "express";
import { crearVenta, listarVentas } from "../controllers/ventasController.js";

const router = Router();

router.post("/", crearVenta);
router.get("/", listarVentas);

export default router;
