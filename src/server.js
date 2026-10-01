const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

// Permite receber JSON
app.use(express.json());

// Permite receber dados de formulários
app.use(express.urlencoded({ extended: true }));

// Arquivos públicos: HTML, CSS, JS, imagens
app.use(express.static(path.join(__dirname, "../public")));

// Rota para testar a API
app.get("/api/test", (req, res) => {
    res.json({
        status: "ok",
        message: "SaaS Hub está funcionando!"
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log("");
    console.log("==================================");
    console.log("  SaaS Hub iniciado com sucesso!");
    console.log(`  http://localhost:${PORT}`);
    console.log("==================================");
    console.log("");
});