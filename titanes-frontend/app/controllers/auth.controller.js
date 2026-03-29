import fetch from "node-fetch";

export const procesarLogin = async (req, res) => {
    const { usuario, clave } = req.body;

    try {
        const respuesta = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, clave })
        });

        const data = await respuesta.json();

        if (data.success) {
            // Guardamos la sesión
            req.session.usuario = data.user; 
            res.redirect("/usuarios");
        } else {
            
            res.redirect("/?error=1");
        }

    } catch (error) {
        console.error("Error conectando al backend:", error);
        
        res.redirect("/?error=connection");
    }
};