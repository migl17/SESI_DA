let numero = "";


const audioLula = new Audio("https://www.myinstants.com/media/sounds/lula-cade-o-ze-gotinha.mp3");
const audioBolsonaro = new Audio("https://www.myinstants.com/media/sounds/bolsonaro-pegaram-meu-telefone.mp3");
const audioConfirma = new Audio("https://www.myinstants.com/media/sounds/urna-eletronica-confirma.mp3");


function pararAudios() {
    audioLula.pause();
    audioLula.currentTime = 0;
    audioBolsonaro.pause();
    audioBolsonaro.currentTime = 0;
    audioConfirma.pause();
    audioConfirma.currentTime = 0;
}

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
        else if (numero === "13") mensagem.innerText = "Candidato 13";
        else if (numero === "22") mensagem.innerText = "Candidato 22";
        else mensagem.innerText = "Voto Nulo";
    }
}

function inserirNumero(num) {
    if (numero.length < 5) {
        numero += num;
        atualizarTela();


        if (numero === "13") {
            pararAudios();
            audioLula.play().catch(e => console.log("Erro ao reproduzir áudio:", e));
        } else if (numero === "22") {
            pararAudios();
            audioBolsonaro.play().catch(e => console.log("Erro ao reproduzir áudio:", e));
        }
    }
}

function corrige() {
    numero = "";
    pararAudios();
    atualizarTela();
}

function confirma() {
    if (numero === "") return;
    pararAudios();
    audioConfirma.play().catch(e => console.log("Erro ao reproduzir áudio:", e));

    let chave = "votos_nulos";
    if (numero === "0140") chave = "votos_0140";
    else if (numero === "0330") chave = "votos_0330";
    else if (numero === "01230") chave = "votos_01230";
    else if (numero === "13") chave = "votos_13";
    else if (numero === "22") chave = "votos_22";

    let total = parseInt(localStorage.getItem(chave) || "0") + 1;
    localStorage.setItem(chave, total);

    document.getElementById("campo-numero").innerText = "";
    document.getElementById("mensagem").innerText = "FIM";

    setTimeout(() => {
        corrige();
    }, 1500);
}