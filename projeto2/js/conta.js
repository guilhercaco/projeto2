async function entrar() {

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Verifica se os campos estão vazios
    if (email === "" || senha === "") {
        alert("Preencha o e-mail e a senha!");
        return;
    }

    try {

        const resposta = await fetch("http://localhost:3000/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                senha: senha
            })
        });

        const dados = await resposta.json();

        // Se a conta existir
        if (dados.existe) {

            alert("Conta conectada!");

            window.location.href = "index.html";

        } else {

            alert("Conta não existe! Crie uma conta.");

            window.location.href = "criar_conta.html";
        }

    } catch (erro) {

        console.error("ERRO:", erro);

        alert("Erro ao conectar com o servidor.");
    }
}