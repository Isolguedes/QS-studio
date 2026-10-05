

const botaoAcessibilidade =
    document.getElementById("btnAcessibilidade");

const painelAcessibilidade =
    document.getElementById("painelAcessibilidade");




botaoAcessibilidade.addEventListener("click", function () {

    painelAcessibilidade.classList.toggle("aberto");

    const aberto =
        painelAcessibilidade.classList.contains("aberto");

    botaoAcessibilidade.setAttribute(
        "aria-expanded",
        aberto
    );

});





let escalaPagina = 1;

function aplicarEscala() {

    document.body.style.zoom = escalaPagina;

}

function aumentarFonte() {

    if (escalaPagina < 1.3) {

        escalaPagina += 0.1;

        aplicarEscala();

    }

}

function diminuirFonte() {

    if (escalaPagina > 0.8) {

        escalaPagina -= 0.1;

        aplicarEscala();

    }

}




function alternarContraste() {

    document.body.classList.toggle(
        "alto-contraste"
    );

}



function alternarEscalaCinza() {

    document.body.classList.toggle(
        "escala-cinza"
    );

}




function alternarFonteLegivel() {

    document.body.classList.toggle(
        "fonte-legivel"
    );

}



function aumentarEspacamento() {

    document.body.classList.toggle(
        "texto-espacado"
    );

}




let leituraAtual = null;

function lerPagina() {

    window.speechSynthesis.cancel();

    const conteudo =
        document.getElementById(
            "conteudo-principal"
        );

    if (!conteudo) {
        return;
    }

    const texto = conteudo.innerText;

    leituraAtual =
        new SpeechSynthesisUtterance(texto);

    leituraAtual.lang = "pt-BR";

    leituraAtual.rate = 1;

    leituraAtual.pitch = 1;

    window.speechSynthesis.speak(
        leituraAtual
    );

}




function pausarLeitura() {

    if (window.speechSynthesis.speaking) {

        if (window.speechSynthesis.paused) {

            window.speechSynthesis.resume();

        } else {

            window.speechSynthesis.pause();

        }

    }

}



function pararLeitura() {

    window.speechSynthesis.cancel();

}


function restaurarAcessibilidade() {

    escalaPagina = 1;

    document.body.style.zoom = 1;

    document.body.classList.remove(
        "alto-contraste",
        "escala-cinza",
        "fonte-legivel",
        "texto-espacado"
    );

    window.speechSynthesis.cancel();

}