async function entrar() {

    const gmail = document.getElementById("gmail").value;
    const senha = document.getElementById("senha").value;

    // Verifica se os campos estão vazios
    if (gmail === "" || senha === "") {
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
                gmail: gmail,
                senha: senha
            })
        });

        const dados = await resposta.json();

        // Se a conta existir
        if (dados.existe) {

            alert("Conta conectada!");

        } else {

            alert("Conta não existe! Crie uma conta.");

            window.location.href = "criar_conta.html";
        }

    } catch (erro) {

        console.error(erro);

        alert("Erro ao conectar com o servidor.");

    }
}

