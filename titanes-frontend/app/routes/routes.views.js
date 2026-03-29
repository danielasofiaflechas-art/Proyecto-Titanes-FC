import { Router } from "express";
import { listarUsuarios } from "../controllers/usuarios.controller.js";
import { procesarLogin } from "../controllers/auth.controller.js";
import { verificarSesion } from "../middleware/auth.middleware.js"; 

const router = Router();

// 1. RUTA PARA EL LOGIN 
router.get("/", (req, res) => {
   
    const error = req.query.error;
    // Le pasamos ese error a la vista login.ejs
    res.render("login", { error: error });
});

// 2. RUTA PARA PROCESAR EL LOGIN
router.post("/login", procesarLogin);

// 3. RUTA PROTEGIDA (Tabla de Usuarios)
router.get("/usuarios", verificarSesion, listarUsuarios); 

// 4. RUTA PARA CERRAR SESIÓN
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log("Error al cerrar sesión:", err);
        }
        res.redirect("/"); 
    });
});

// 5. RUTA PARA VER EL FORMULARIO DE REGISTRO
router.get("/registro", verificarSesion, (req, res) => {
    res.render("registro", { user: req.session.usuario });
});

// 6. RUTA PARA PROCESAR EL REGISTRO (Enviar los datos al Backend)
router.post("/registro", async (req, res) => {
    try {
        const { nombre, rol, usuario, clave } = req.body;

        // Llamamos a la API del Backend (Puerto 3000)
        const respuesta = await fetch("http://localhost:3000/api/usuarios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, rol, usuario, clave })
        });

        const data = await respuesta.json();

        if (data.success) {
            // Si se creó con éxito, volvemos a la tabla para verlo
            res.redirect("/usuarios");
        } else {
            res.send("Error al crear el usuario en la base de datos.");
        }
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).send("Error de conexión con el Backend.");
    }
});

export default router;