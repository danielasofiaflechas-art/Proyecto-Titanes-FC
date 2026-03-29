import express from "express";
import cors from "cors";
import apiRutas from "./app/routes/api.routes.js";

const app = express();
app.use(cors()); 
app.use(express.json());

app.use("/api", apiRutas);

app.listen(3000, () => {
    console.log("Backend de Titanes corriendo en http://localhost:3000");
});