import fetch from "node-fetch";

export const listarUsuarios = async (req, res) => {
    try {
        
        const respuesta = await fetch("http://localhost:3000/api/usuarios");
        const usuarios = await respuesta.json();

        
        res.render("usuarios", { 
            usuarios: usuarios, 
            user: req.session.usuario 
        });

    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.send("Error: No se pudo conectar con el Backend.");
    }
};