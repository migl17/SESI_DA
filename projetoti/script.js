let numero = "";

function atualizarTela() {
    const campo = document.getElementById("campo-numero");
    const mensagem = document.getElementById("mensagem");

    if (numero === "") {
        campo.innerText = "_ _ _ _";
        mensagem.innerText = "";
    } else {
        campo.innerText = numero;
        if (numero === "0140") mensagem.innerText = "Candidato 1";
        else if (numero === "0330") mensagem.innerText = "Candidato 2";
        else if (numero === "01230") mensagem.innerText = "Candidato 3";
        else mensagem.innerText = "Voto Nulo";
    }
}

function inserirNumero(num) {
    if (numero.length < 5) {
        numero += num;
        atualizarTela();
    }
}

function corrige() {
    numero = "";
    atualizarTela();
}

function confirma() {
    if (numero === "") return;

    let chave = "votos_nulos";
    if (numero === "0140") chave = "votos_0140";
    else if (numero === "0330") chave = "votos_0330";
    else if (numero === "01230") chave = "votos_01230";

    let total = parseInt(localStorage.getItem(chave) || "0") + 1;
    localStorage.setItem(chave, total);

    document.getElementById("campo-numero").innerText = "";
    document.getElementById("mensagem").innerText = "FIM";

    setTimeout(() => {
        corrige();
    }, 1500);
}