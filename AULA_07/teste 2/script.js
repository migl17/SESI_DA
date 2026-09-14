const posicoes = document.querySelectorAll('.posicao');
const modoSelect = document.getElementById('modo');
const btnReset = document.getElementById('btnReset');
const placarX = document.getElementById('placarX');
const placarO = document.getElementById('placarO');

let tabuleiro = ['', '', '', '', '', '', '', '', ''];
let jogadorAtual = 'X';
let jogoAtivo = true;
let vitoriasX = 0;
let vitoriasO = 0;

const combinacoesVitoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6]             // Diagonais
];

// Configuração dos eventos de clique nas posições
posicoes.forEach((posicao, index) => {
    posicao.addEventListener('click', () => jogar(index));
});

// Eventos dos controles
btnReset.addEventListener('click', reiniciarJogo);
modoSelect.addEventListener('change', reiniciarJogo);

function jogar(index) {
    if (tabuleiro[index] !== '' || !jogoAtivo) return;

    fazerMovimento(index, jogadorAtual);

    if (checarFim()) return;

    // Alterna o turno
    jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';

    // Jogada da IA caso o próximo seja o Robô
    if (modoSelect.value !== 'pvp' && jogadorAtual === 'O' && jogoAtivo) {
        setTimeout(jogadaIA, 250);
    }
}

function fazerMovimento(index, jogador) {
    tabuleiro[index] = jogador;
    posicoes[index].textContent = jogador;
}

function checarFim() {
    if (checarVitoria(tabuleiro, jogadorAtual)) {
        if (jogadorAtual === 'X') {
            vitoriasX++;
            placarX.textContent = vitoriasX;
        } else {
            vitoriasO++;
            placarO.textContent = vitoriasO;
        }
        setTimeout(() => alert(`O jogador '${jogadorAtual}' venceu!`), 10);
        jogoAtivo = false;
        return true;
    }

    if (tabuleiro.every(pos => pos !== '')) {
        setTimeout(() => alert('Deu velha! (Empate)'), 10);
        jogoAtivo = false;
        return true;
    }

    return false;
}

function checarVitoria(board, player) {
    return combinacoesVitoria.some(combinacao => {
        return combinacao.every(index => board[index] === player);
    });
}

function reiniciarJogo() {
    tabuleiro = ['', '', '', '', '', '', '', '', ''];
    jogadorAtual = 'X';
    jogoAtivo = true;
    posicoes.forEach(pos => pos.textContent = '');
}

// Inteligência Artificial Simples
function jogadaIA() {
    const modo = modoSelect.value;
    let idx;

    if (modo === 'facil') {
        idx = jogadaAleatoria();
    } else if (modo === 'medio') {
        idx = Math.random() < 0.5 ? jogadaInteligente() : jogadaAleatoria();
    } else if (modo === 'dificil') {
        idx = jogadaInteligente();
    }

    if (idx !== undefined) {
        jogar(idx);
    }
}

function jogadaAleatoria() {
    const livres = tabuleiro.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
    if (livres.length === 0) return undefined;
    return livres[Math.floor(Math.random() * livres.length)];
}

function jogadaInteligente() {
    // 1. Tenta vencer se houver jogada imediata
    for (let i = 0; i < 9; i++) {
        if (tabuleiro[i] === '') {
            tabuleiro[i] = 'O';
            if (checarVitoria(tabuleiro, 'O')) {
                tabuleiro[i] = '';
                return i;
            }
            tabuleiro[i] = '';
        }
    }

    // 2. Bloqueia a vitória do adversário (X)
    for (let i = 0; i < 9; i++) {
        if (tabuleiro[i] === '') {
            tabuleiro[i] = 'X';
            if (checarVitoria(tabuleiro, 'X')) {
                tabuleiro[i] = '';
                return i;
            }
            tabuleiro[i] = '';
        }
    }

    // 3. Tenta ocupar o centro
    if (tabuleiro[4] === '') return 4;

    // 4. Jogada aleatória nas demais posições
    return jogadaAleatoria();
}