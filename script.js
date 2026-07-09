// Mensagem de boas-vindas
console.log("Receitas Chefe Dan 👨‍🍳 carregado com sucesso!");


// Botão "Ver Receitas"

const botao = document.querySelector(".botao");

if (botao) {

    botao.addEventListener("click", () => {

        console.log("Abrindo página de receitas...");

    });

}


// Barra de pesquisa

const pesquisa = document.querySelector(".pesquisa input");

if (pesquisa) {

    pesquisa.addEventListener("input", () => {

        console.log("Pesquisando:", pesquisa.value);

    });

}
