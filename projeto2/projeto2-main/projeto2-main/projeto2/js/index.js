import "dotenv/config";
import express from "express";
import cors from "cors";
import { neon } from "@neondatabase/serverless";

const app = express();

const sql = neon(process.env.DATABASE_URL);

app.use(cors());
app.use(express.json());

app.post("/cadastrar", async (req, res) => {

    try {

        const { email, senha, nome, cep } = req.body;

        await sql`
            INSERT INTO cliente (email, senha, nome, cep)
            VALUES (${email}, ${senha}, ${nome}, ${cep})
        `;

        res.json({
            mensagem: "Cliente cadastrado com sucesso!"
        });

    } catch (erro) {

        console.error("ERRO NO BANCO:", erro);

        res.status(500).json({
            mensagem: "Erro ao cadastrar cliente."
        });

    }

});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});