import db from "../config/db.js";

export const obtenerUsuarios = (req, res) => {
    const sql = "SELECT id, nombre, rol, usuario FROM usuarios";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results); 
    });
};

export const crearUsuario = (req, res) => {
    const { nombre, rol, usuario, clave } = req.body;
    const sql = "INSERT INTO usuarios (nombre, rol, usuario, clave) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [nombre, rol, usuario, clave], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: "Error en la base de datos" });
        }
        res.json({ success: true, message: "¡Titán registrado!" });
    });

};

export const eliminarUsuario = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM usuarios WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar:", err);
            return res.status(500).json({ success: false, message: "Error en la base de datos" });
        }

        return res.status(200).json({ 
            success: true, 
            message: "Titán eliminado correctamente" 
        });
    });
};