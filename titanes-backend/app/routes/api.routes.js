import { Router } from "express";

import { 
    obtenerUsuarios, 
    crearUsuario, 
    eliminarUsuario, 
    obtenerUsuarioPorId, 
    actualizarUsuario 
} from "../controllers/usuarios.api.js";

import { validarLogin } from "../controllers/auth.api.js";

const router = Router();

// Rutas de Usuarios
router.get("/usuarios", obtenerUsuarios);            // GET (Listar todos)
router.get("/usuarios/:id", obtenerUsuarioPorId);    // GET por ID (Mostrar uno)
router.post("/usuarios", crearUsuario);              // POST (Crear)
router.put("/usuarios/:id", actualizarUsuario);      // PUT (Actualizar)
router.delete("/usuarios/:id", eliminarUsuario);     // DELETE (Eliminar)

// Rutas de Autenticación
router.post("/login", validarLogin);

export default router;