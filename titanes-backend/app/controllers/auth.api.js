import db from "../config/db.js";

export const validarLogin = (req, res) => {
    const { usuario, clave } = req.body;
    
    // Buscamos en la tabla 'usuarios' de PHPMyAdmin
    const sql = "SELECT * FROM usuarios WHERE usuario = ? AND clave = ?";
    
    db.query(sql, [usuario, clave], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "Error en servidor" });

        if (result.length > 0) {
            // Si lo encuentra, responde que todo OK
            res.json({ success: true, user: result[0] });
        } else {
            // Si no coincide, responde error
            res.json({ success: false, message: "Usuario o clave incorrecta" });
        }
    });
};