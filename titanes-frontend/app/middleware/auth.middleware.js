export const verificarSesion = (req, res, next) => {
    console.log("--- Verificando Sesión ---");
    console.log("Usuario en sesión:", req.session.usuario);

    // Si NO hay usuario en la sesión, mandarlo al login
    if (!req.session.usuario) {
        console.log("Acceso denegado: Redirigiendo al Login...");
        return res.redirect("/");
    }

    // Si sí hay, continuar a la tabla
    next();
};