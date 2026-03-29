import mysql from "mysql2";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "titanes_db"
});

db.connect((err) => {
    if (err) {
        console.error("❌ Error conectando a la DB:", err);
        return;
    }
    console.log("Conectado a la base de datos Titanes");
});

export default db;