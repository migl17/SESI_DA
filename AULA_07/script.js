const posicoes = document.querySelectorAll('.posicao');
let jogadorAtual = 'X';
let jogoAtivo = true;

// Combinações possíveis para ganhar
const combinacoesVitoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6]             // Diagonais
];

posicoes.forEach((posicao) => {
    posicao.addEventListener('click', () => {
        // Se a posição já tem X/O ou o jogo acabou, ignora o clique
        if (posicao.textContent !== '' || !jogoAtivo) return;

        // Preenche o quadrado com X ou O
        posicao.textContent = jogadorAtual;

        // Verifica vitória
        if (checarVitoria()) {
            setTimeout(() => alert(`O jogador '${jogadorAtual}' venceu!`), 10);
            jogoAtivo = false;
            return;
        }

        // Verifica empate
        if (checarEmpate()) {
            setTimeout(() => alert('Deu velha! (Empate)'), 10);
            jogoAtivo = false;
            return;
        }

        // Alterna entre X e O
        jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
    });
});

function checarVitoria() {
    return combinacoesVitoria.some(combinacao => {
        return combinacao.every(index => {
            return posicoes[index].textContent === jogadorAtual;
        });
    });
}

function checarEmpate() {
    return [...posicoes].every(posicao => posicao.textContent !== '');
}