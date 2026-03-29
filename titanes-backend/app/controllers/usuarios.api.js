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

// Buscar un solo usuario por ID
export const obtenerUsuarioPorId = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT id, nombre, rol, usuario FROM usuarios WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json(result[0]);
    });
};

// Actualizar un usuario existente
export const actualizarUsuario = (req, res) => {
    const { id } = req.params;
    const { nombre, rol, usuario } = req.body;
    const sql = "UPDATE usuarios SET nombre = ?, rol = ?, usuario = ? WHERE id = ?";
    db.query(sql, [nombre, rol, usuario, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: "¡Titán actualizado correctamente!" });
    });
};