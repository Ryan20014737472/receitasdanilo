// Mensagem de boas-vindas
console.log("Receitas Chefe Dan 👨‍🍳 carregado com sucesso!");

// Botão "Ver Receitas"
const botao = document.querySelector(".botao");

if (botao) {
    botao.addEventListener("click", () => {
        console.log("Abrindo página de receitas...");
    });
}

// Pesquisa e favoritos das receitas
const pesquisa = document.querySelector(".pesquisa input");
const cards = Array.from(document.querySelectorAll(".card"));
const listaDeCards = document.querySelector(".destaques .cards");
const areaFavoritas = document.querySelector(".favoritas");
const listaFavoritas = document.querySelector(".cards-favoritas");
const chaveFavoritos = "receitas-favoritas";

function normalizarTexto(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function lerFavoritos() {
    try {
        return JSON.parse(localStorage.getItem(chaveFavoritos)) || [];
    } catch {
        return [];
    }
}

function salvarFavoritos(favoritos) {
    localStorage.setItem(chaveFavoritos, JSON.stringify(favoritos));
}

function atualizarBotaoFavorito(botaoFavorito, favorito) {
    botaoFavorito.classList.toggle("favoritado", favorito);
    botaoFavorito.setAttribute("aria-pressed", favorito);
    botaoFavorito.textContent = favorito ? "★ Favoritada" : "☆ Favoritar";
}

function identificadorDaReceita(card) {
    const linkDaReceita = card.querySelector("a[href]");

    return linkDaReceita
        ? linkDaReceita.getAttribute("href")
        : card.querySelector("h3")?.textContent.trim();
}

function atualizarAreaFavoritas() {
    if (!areaFavoritas || !listaFavoritas) return;

    const favoritos = lerFavoritos();
    listaFavoritas.innerHTML = "";
    areaFavoritas.hidden = favoritos.length === 0;

    cards.forEach((card) => {
        const identificador = identificadorDaReceita(card);

        if (!identificador || !favoritos.includes(identificador)) return;

        const cardFavorito = card.cloneNode(true);
        cardFavorito.querySelector(".botao-favorito")?.remove();
        listaFavoritas.appendChild(cardFavorito);
    });
}

if (cards.length) {
    const favoritos = lerFavoritos();

    cards.forEach((card) => {
        const identificador = identificadorDaReceita(card);

        if (!identificador) return;

        const botaoFavorito = document.createElement("button");
        botaoFavorito.type = "button";
        botaoFavorito.className = "botao-favorito";

        const favorito = favoritos.includes(identificador);
        atualizarBotaoFavorito(botaoFavorito, favorito);

        botaoFavorito.addEventListener("click", () => {
            const favoritosAtuais = lerFavoritos();
            const jaFavoritada = favoritosAtuais.includes(identificador);

            const novosFavoritos = jaFavoritada
                ? favoritosAtuais.filter((item) => item !== identificador)
                : [...favoritosAtuais, identificador];

            salvarFavoritos(novosFavoritos);
            atualizarBotaoFavorito(botaoFavorito, !jaFavoritada);
            atualizarAreaFavoritas();
        });

        card.appendChild(botaoFavorito);
    });

    atualizarAreaFavoritas();
}

if (pesquisa && cards.length) {
    const mensagemSemResultados = document.createElement("p");
    mensagemSemResultados.className = "sem-resultados";
    mensagemSemResultados.textContent = "Nenhuma receita encontrada.";
    mensagemSemResultados.hidden = true;

    if (listaDeCards) {
        listaDeCards.insertAdjacentElement("afterend", mensagemSemResultados);
    }

    pesquisa.addEventListener("input", () => {
        const termo = normalizarTexto(pesquisa.value);
        let quantidadeVisivel = 0;

        cards.forEach((card) => {
            const encontrada = normalizarTexto(card.textContent).includes(termo);
            card.hidden = !encontrada;

            if (encontrada) quantidadeVisivel++;
        });

        mensagemSemResultados.hidden = quantidadeVisivel !== 0;
    });
}

const carrossel = document.querySelector(".carrossel");

if(carrossel){

    const principal = document.querySelector(".imagemPrincipal");
    const thumbs = document.querySelectorAll(".thumb");
    const esquerda = document.querySelector(".esquerda");
    const direita = document.querySelector(".direita");

    const imagens = [];

    thumbs.forEach((thumb)=>{

        imagens.push(thumb.src);

    });

    let indice = 0;

    function atualizar(){

        principal.src = imagens[indice];

        thumbs.forEach((thumb)=>{

            thumb.classList.remove("ativa");

        });

        thumbs[indice].classList.add("ativa");

    }

    direita.addEventListener("click",()=>{

        indice++;

        if(indice>=imagens.length){

            indice=0;

        }

        atualizar();

    });

    esquerda.addEventListener("click",()=>{

        indice--;

        if(indice<0){

            indice=imagens.length-1;

        }

        atualizar();

    });

    thumbs.forEach((thumb,i)=>{

        thumb.addEventListener("click",()=>{

            indice=i;

            atualizar();

        });

    });

    let automatico = setInterval(proximaImagem,5000);

    function proximaImagem(){

        indice++;

        if(indice>=imagens.length){

            indice=0;

        }

        atualizar();

    }

    carrossel.addEventListener("mouseenter",()=>{

        clearInterval(automatico);

    });

    carrossel.addEventListener("mouseleave",()=>{

        automatico=setInterval(proximaImagem,5000);

    });

}
