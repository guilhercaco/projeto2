import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function testarBanco() {
    try {
        const resultado = await sql`SELECT NOW()`;

        console.log("Banco conectado!");
        console.log(resultado);
    } catch (erro) {
        console.error("Erro ao conectar:", erro);
    }
}

testarBanco();