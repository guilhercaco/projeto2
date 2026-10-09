import "dotenv/config";
import express from "express";
import cors from "cors";
import { neon } from "@neondatabase/serverless";

const app = express();

const sql = neon(process.env.DATABASE_URL);

app.use(cors());
app.use(express.json());


// =========================
// CADASTRAR CLIENTE
// =========================

app.post("/cadastrar", async (req, res) => {

    try {

        const { email, senha, nome, cep } = req.body;

        console.log("CADASTRO:", email, nome, cep);

        await sql`
            INSERT INTO cliente (email, senha, nome, cep)
            VALUES (${email}, ${senha}, ${nome}, ${cep})
        `;

        res.json({
            mensagem: "Cliente cadastrado com sucesso!"
        });

    } catch (erro) {

        console.error("ERRO NO CADASTRO:", erro);

        res.status(500).json({
            mensagem: "Erro ao cadastrar cliente."
        });
    }
});


// =========================
// LOGIN
// =========================

app.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const cliente = await sql`
      SELECT id, nome, email
      FROM cliente
      WHERE email = ${email}
        AND senha = ${senha}
    `;

    if (cliente.length > 0) {
      res.json({
        existe: true,
        id_cliente: cliente[0].id,
        nome: cliente[0].nome
      });
    } else {
      res.json({ existe: false });
    }
  } catch (erro) {
    console.error("ERRO NO LOGIN:", erro);
    res.status(500).json({
      mensagem: "Erro ao verificar a conta."
    });
  }
});

// =========================
// CADASTRAR / ATUALIZAR ENDEREÇO
// =========================

app.post("/endereco", async (req, res) => {
    try {
        const { id_cliente, cep, rua, complemento } = req.body;

        if (!id_cliente || !cep || !rua) {
            return res.status(400).json({
                mensagem: "Informe o cliente, o CEP e a rua."
            });
        }

        const cliente = await sql`
            UPDATE cliente
            SET cep = ${cep},
                rua = ${rua},
                complemento = ${complemento || ""}
            WHERE id = ${id_cliente}
            RETURNING id, cep, rua, complemento
        `;

        if (cliente.length === 0) {
            return res.status(404).json({
                mensagem: "Cliente não encontrado."
            });
        }

        res.json({
            mensagem: "Endereço cadastrado com sucesso!",
            cliente: cliente[0]
        });

    } catch (erro) {
        console.error("ERRO AO CADASTRAR ENDEREÇO:", erro);

        res.status(500).json({
            mensagem: "Erro ao cadastrar o endereço."
        });
    }
});
// =========================
// SERVIDOR
// =========================

app.listen(3000, () => {

    console.log("Servidor rodando em http://localhost:3000");

});