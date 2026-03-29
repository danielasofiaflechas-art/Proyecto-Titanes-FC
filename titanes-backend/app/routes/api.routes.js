import { Router } from "express";

import { obtenerUsuarios, crearUsuario, eliminarUsuario } from "../controllers/usuarios.api.js";
import { validarLogin } from "../controllers/auth.api.js";

const router = Router();

// Rutas
router.get("/usuarios", obtenerUsuarios);
router.post("/usuarios", crearUsuario);
router.delete("/usuarios/:id", eliminarUsuario); 
router.post("/login", validarLogin);

export default router;