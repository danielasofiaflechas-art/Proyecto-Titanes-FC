import fetch from "node-fetch";

export const listarUsuarios = async (req, res) => {
    try {
        // 1. El Frontend le pide la lista de usuarios al Backend
        const respuesta = await fetch("http://localhost:3000/api/usuarios");
        const usuarios = await respuesta.json();

        // 2. ENVIAMOS LOS DATOS A LA PLANTILLA (Agregamos 'user')
        res.render("usuarios", { 
            usuarios: usuarios, 
            user: req.session.usuario // <-- ESTO ES LO NUEVO: Pasamos los datos del que inició sesión
        });

    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.send("Error: No se pudo conectar con el Backend.");
    }
};