function login() {
    // 1º Acessar o valor digitado nos campos USUARIO e SENHA
    const cmapo_usuario = document.getElementById("usuario").value;
    const campo_senha = document.getElementById("senha").value;

    // 2º carregar os valores do localStorange
    const local_usuario = localStorage.getItem("usuario");
    const local_senha = localStorage.getItem("senha");

    // 3º Validar se o valores digitados são iguais aos valores armazenados no localStorage
    if (cmapo_usuario == local_usuario && campo_senha == local_senha) {
        alert("Login realizado com sucesso! 👍");
    } else {
        alert("Usuário ou senha inválidos! 👎");
    }

}


function cadastro() {
    // 1º Carregar os campos de cadastro
    // NOME, USUÁRIO, SENHA, PALAVRA-PASSE
    const campo_nome = document.getElementById("nome").value;
    const campo_usuario = document.getElementById("usuario").value;
    const campo_senha = document.getElementById("senha").value;
    const campo_palavra_passe = document.getElementById("palavra_passe").value;

    const mensagem = document.getElementById("mensagem");

    // Validação simples: nenhum campo pode ficar em branco
    if (!campo_nome || !campo_usuario || !campo_senha || !campo_palavra_passe) {
        mensagem.textContent = "Preencha todos os campos! 👎";
        return;
    }

    // 2º Cadastrar os dados no localStorage
    // Ex.: localStorage.setItem("NOME", valor)
    // OBS.: "valor" é o dado que foi carregado no passo 1
    localStorage.setItem("nome", campo_nome);
    localStorage.setItem("usuario", campo_usuario);
    localStorage.setItem("senha", campo_senha);
    localStorage.setItem("palavra_passe", campo_palavra_passe);

    // Zera o contador de tentativas de recuperação de senha de um cadastro anterior
    localStorage.removeItem("tentativas_recuperacao");

    alert("Cadastro realizado com sucesso! 👍");

    // 3º Redirecionar para a tela de login
    window.location.href = "./login.html";
}


function recuperar_senha() {
    const campo_nome = document.getElementById("nome");
    const campo_palavra_passe = document.getElementById("palavra_passe");
    const mensagem = document.getElementById("mensagem");
    const botao = document.getElementById("btn_recuperar");

    const LIMITE_TENTATIVAS = 3;

    // Lembrem-se de salvar a quantidade de erros no localStorage.
    let tentativas = parseInt(localStorage.getItem("tentativas_recuperacao")) || 0;

    // Se já atingiu o limite, bloqueia os campos e não deixa tentar de novo
    if (tentativas >= LIMITE_TENTATIVAS) {
        campo_nome.disabled = true;
        campo_palavra_passe.disabled = true;
        botao.disabled = true;
        mensagem.textContent = "Número máximo de tentativas excedido. Recuperação bloqueada! 🔒";
        return;
    }

    // 1º Carregar os valores dos campos NOME e PALAVRA-PASSE
    const valor_nome = campo_nome.value;
    const valor_palavra_passe = campo_palavra_passe.value;

    // 2º Buscar no localStorage os valores de NOME e PALAVRA-PASSE
    const local_nome = localStorage.getItem("nome");
    const local_palavra_passe = localStorage.getItem("palavra_passe");
    const local_senha = localStorage.getItem("senha");

    // 3º Comparar se os valores carregados nos campos da tela
    // são compatíveis com os valores armazenados no localStorage.
    if (valor_nome == local_nome && valor_palavra_passe == local_palavra_passe && local_nome != null) {
        // Se forem iguais, exibir a senha na tela ou em um alert.
        mensagem.textContent = "Sua senha é: " + local_senha;
        alert("Sua senha é: " + local_senha);

        // Recuperação feita com sucesso, zera o contador de tentativas
        localStorage.removeItem("tentativas_recuperacao");
    } else {
        // Se forem diferentes, notificar o usuário na tela ou em um alert
        // informando que os dados não são compatíveis.
        tentativas++;
        localStorage.setItem("tentativas_recuperacao", tentativas);

        const tentativas_restantes = LIMITE_TENTATIVAS - tentativas;

        if (tentativas_restantes > 0) {
            alert("Nome ou palavra-passe inválidos! Tentativas restantes: " + tentativas_restantes);
            mensagem.textContent = "Nome ou palavra-passe inválidos! Tentativas restantes: " + tentativas_restantes;
        } else {
            alert("Nome ou palavra-passe inválidos! Você atingiu o limite de tentativas. 🔒");
            mensagem.textContent = "Número máximo de tentativas excedido. Recuperação bloqueada! 🔒";
            campo_nome.disabled = true;
            campo_palavra_passe.disabled = true;
            botao.disabled = true;
        }

        // Além disso, limpar os campos de entrada (inputs).
        campo_nome.value = "";
        campo_palavra_passe.value = "";
    }
}
