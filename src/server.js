const express = require("express");
const path = require("path");
require("dotenv").config();

const pool = require("./database/connection");

const app = express();

const PORT = process.env.PORT || 3000;

// ========================================
// MIDDLEWARES
// ========================================

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));

// ========================================
// TESTE DA API
// ========================================

app.get("/api/test", (req, res) => {
    res.json({
        status: "ok",
        message: "SaaS Hub está funcionando!"
    });
});

// ========================================
// TESTE DO POSTGRESQL
// ========================================

app.get("/api/db-test", async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT NOW() AS data_hora"
        );

        res.json({
            status: "ok",
            message: "PostgreSQL conectado com sucesso!",
            database: process.env.DB_NAME,
            dataHora: result.rows[0].data_hora
        });

    } catch (error) {

        console.error("Erro PostgreSQL:", error.message);

        res.status(500).json({
            status: "erro",
            message: "Não foi possível conectar ao PostgreSQL.",
            erro: error.message
        });
    }
});

// ========================================
// INICIA SERVIDOR
// ========================================

app.listen(PORT, async () => {

    console.log("");
    console.log("======================================");
    console.log("       SaaS Hub");
    console.log("======================================");
    console.log(`Servidor: http://localhost:${PORT}`);

    try {

        await pool.query("SELECT 1");

        console.log("PostgreSQL: CONECTADO ✅");

    } catch (error) {

        console.log("PostgreSQL: ERRO ❌");
        console.log(error.message);
    }

    console.log("======================================");
    console.log("");
});