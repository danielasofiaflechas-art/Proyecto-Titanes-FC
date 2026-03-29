import express from "express";
import session from "express-session";
import rutas from "./app/routes/routes.views.js";

const app = express();
const PORT = 4000;

// 1. Configurar EJS
app.set("view engine", "ejs");
app.set("views", "./views");

// 2. Archivos estáticos 
app.use(express.static("public"));

// 3. Middlewares para leer formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 4. Configuración de sesiones
app.use(session({
    secret: "mi_secreto_titanes_2024",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 2 * 60 * 60 * 1000 } // 2 horas
}));

// 5. Usar las rutas
app.use("/", rutas);

app.listen(PORT, () => {
    console.log(`Frontend corriendo en http://localhost:${PORT}`);
});