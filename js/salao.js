const WHATSAPP_QS = "5538999244236";

const precosCiliosManutencao = {
    "Volume Classic / Efeito Rímel": 85,
    "Fox / Raposa": 100,
    "Volume Brasileiro / Mega Brasileiro": 120
};

function moeda(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function textoSelecionado(id) {
    const elemento = document.getElementById(id);

    if (!elemento) {
        return "";
    }

    return elemento.value || "";
}

function valorSelecionado(id) {
    const elemento = document.getElementById(id);

    if (!elemento || elemento.selectedIndex < 0) {
        return 0;
    }

    const opcao = elemento.options[elemento.selectedIndex];

    return Number(opcao.dataset.preco || 0);
}

function radioSelecionado(nome) {
    const elemento = document.querySelector(
        `input[name="${nome}"]:checked`
    );

    return elemento ? elemento.value : "";
}

function formatarData(data) {
    if (!data) {
        return "";
    }

    const partes = data.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function atualizarBlocos() {
    const blocoCilios = document.getElementById("blocoCilios");
    const blocoUnhas = document.getElementById("blocoUnhas");

    const adicionarCilios =
        radioSelecionado("adicionarCilios");

    const adicionarUnhas =
        radioSelecionado("adicionarUnhas");

    if (blocoCilios) {
        if (adicionarCilios === "sim") {
            blocoCilios.classList.remove("is-hidden");
        } else {
            blocoCilios.classList.add("is-hidden");
        }
    }

    if (blocoUnhas) {
        if (adicionarUnhas === "sim") {
            blocoUnhas.classList.remove("is-hidden");
        } else {
            blocoUnhas.classList.add("is-hidden");
        }
    }

    const material =
        textoSelecionado("materialTranca");

    const fotoInspiracao =
        document.getElementById("fotoInspiracao");

    const fotoCabelo =
        document.getElementById("fotoCabelo");

    if (fotoInspiracao) {
        const campo =
            fotoInspiracao.closest(".pre-campo");

        if (campo) {
            if (material === "Material do studio") {
                campo.classList.remove("is-hidden");
            } else {
                campo.classList.add("is-hidden");
            }
        }
    }

    if (fotoCabelo) {
        const campo =
            fotoCabelo.closest(".pre-campo");

        if (campo) {
            if (material === "Material do studio") {
                campo.classList.remove("is-hidden");
            } else {
                campo.classList.add("is-hidden");
            }
        }
    }
}

function calcularCotacao() {
    let total = 0;

    const itens = [];

    const tipoTranca =
        textoSelecionado("tipoTranca");

    const tamanho =
        textoSelecionado("tamanhoTranca");

    const material =
        textoSelecionado("materialTranca");

    if (tipoTranca === "Box Braids" && tamanho) {
        const valorTranca =
            valorSelecionado("tamanhoTranca");

        total += valorTranca;

        itens.push(
            `Box Braids ${tamanho}: ${moeda(valorTranca)}`
        );
    } else if (tipoTranca) {
        itens.push(
            `${tipoTranca}: valor a confirmar`
        );
    }

    if (material === "Material do studio") {
        total += 125;

        itens.push(
            `Material QS Studio: ${moeda(125)}`
        );
    }

    if (
        radioSelecionado("adicionarCilios") === "sim"
    ) {
        const tipoCilios =
            textoSelecionado("tipoCilios");

        const atendimentoCilios =
            textoSelecionado("tipoAtendimentoCilios");

        if (tipoCilios) {
            if (
                atendimentoCilios === "manutencao"
            ) {
                const valor =
                    precosCiliosManutencao[tipoCilios];

                if (valor !== undefined) {
                    total += valor;

                    itens.push(
                        `Manutenção de cílios - ${tipoCilios}: ${moeda(valor)}`
                    );
                } else {
                    itens.push(
                        `Manutenção de ${tipoCilios}: indisponível`
                    );
                }
            } else {
                const valor =
                    valorSelecionado("tipoCilios");

                total += valor;

                itens.push(
                    `${tipoCilios}: ${moeda(valor)}`
                );
            }
        }
    }

    if (
        radioSelecionado("adicionarUnhas") === "sim"
    ) {
        const servicoUnha =
            textoSelecionado("servicoUnha");

        const formatoUnha =
            textoSelecionado("formatoUnha");

        if (servicoUnha) {
            const valor =
                valorSelecionado("servicoUnha");

            total += valor;

            itens.push(
                `${servicoUnha}: ${moeda(valor)}`
            );

            if (
                formatoUnha &&
                servicoUnha !== "Mão" &&
                servicoUnha !== "Pé e mão"
            ) {
                itens.push(
                    `Formato: ${formatoUnha}`
                );
            }
        }

        const quantidade3D =
            Number(
                textoSelecionado("quantidade3D") || 0
            );

        const valor3D =
            valorSelecionado("quantidade3D");

        if (quantidade3D > 0) {
            total += valor3D;

            itens.push(
                `Decoração 3D (${quantidade3D} unha(s)): + ${moeda(valor3D)}`
            );
        }

        const unhasQuebradas =
            Number(
                textoSelecionado("unhasQuebradas") || 0
            );

        const valorQuebradas =
            valorSelecionado("unhasQuebradas");

        if (unhasQuebradas > 0) {
            total += valorQuebradas;

            itens.push(
                `${unhasQuebradas} unha(s) quebrada(s): + ${moeda(valorQuebradas)}`
            );
        }
    }

    const resumo =
        document.getElementById("resumoServicos");

    const valorTotal =
        document.getElementById("valorTotal");

    if (resumo) {
        if (itens.length > 0) {
            resumo.innerHTML =
                itens
                    .map(
                        item => `<div>${item}</div>`
                    )
                    .join("");
        } else {
            resumo.innerHTML =
                "Selecione os serviços para montar sua cotação.";
        }
    }

    if (valorTotal) {
        valorTotal.textContent =
            moeda(total);
    }

    return {
        total,
        itens
    };
}

function validarFormulario() {
    const nome =
        document.getElementById("nome");

    const telefone =
        document.getElementById("telefone");

    const data =
        document.getElementById("data");

    const horario =
        document.getElementById("horario");

    if (
        !nome ||
        !nome.value.trim() ||
        !telefone ||
        !telefone.value.trim() ||
        !textoSelecionado("tipoTranca") ||
        !textoSelecionado("materialTranca") ||
        !data ||
        !data.value ||
        !horario ||
        !horario.value
    ) {
        alert(
            "Preencha todos os campos obrigatórios."
        );

        return false;
    }

    if (
        textoSelecionado("tipoTranca") ===
            "Box Braids" &&
        !textoSelecionado("tamanhoTranca")
    ) {
        alert(
            "Selecione o tamanho da Box Braids."
        );

        return false;
    }

    if (
        radioSelecionado("adicionarCilios") ===
        "sim"
    ) {
        const tipoCilios =
            textoSelecionado("tipoCilios");

        if (!tipoCilios) {
            alert(
                "Selecione o serviço de cílios."
            );

            return false;
        }

        const atendimento =
            textoSelecionado(
                "tipoAtendimentoCilios"
            );

        if (
            atendimento === "manutencao" &&
            precosCiliosManutencao[tipoCilios] ===
                undefined
        ) {
            alert(
                "Esse modelo de cílios não possui manutenção."
            );

            return false;
        }
    }

    if (
        radioSelecionado("adicionarUnhas") ===
            "sim" &&
        !textoSelecionado("servicoUnha")
    ) {
        alert(
            "Selecione o serviço de unhas."
        );

        return false;
    }

    const dataEscolhida =
        new Date(
            `${data.value}T12:00:00`
        );

    const hoje = new Date();

    hoje.setHours(0, 0, 0, 0);

    if (dataEscolhida < hoje) {
        alert(
            "Escolha uma data futura."
        );

        return false;
    }

    if (dataEscolhida.getDay() === 0) {
        alert(
            "O QS Studio não atende aos domingos."
        );

        return false;
    }

    return true;
}

function gerarCodigo() {
    const agora = new Date();

    const ano =
        String(
            agora.getFullYear()
        ).slice(-2);

    const mes =
        String(
            agora.getMonth() + 1
        ).padStart(2, "0");

    const dia =
        String(
            agora.getDate()
        ).padStart(2, "0");

    const hora =
        String(
            agora.getHours()
        ).padStart(2, "0");

    const minuto =
        String(
            agora.getMinutes()
        ).padStart(2, "0");

    const segundo =
        String(
            agora.getSeconds()
        ).padStart(2, "0");

    return `QS-${ano}${mes}${dia}-${hora}${minuto}${segundo}`;
}

function coletarDados() {
    const cotacao =
        calcularCotacao();

    const tipoCilios =
        radioSelecionado("adicionarCilios") ===
        "sim"
            ? textoSelecionado("tipoCilios")
            : "";

    const atendimentoCilios =
        tipoCilios
            ? textoSelecionado(
                  "tipoAtendimentoCilios"
              )
            : "";

    let valorCilios = 0;

    if (tipoCilios) {
        if (
            atendimentoCilios === "manutencao"
        ) {
            valorCilios =
                precosCiliosManutencao[
                    tipoCilios
                ] || 0;
        } else {
            valorCilios =
                valorSelecionado("tipoCilios");
        }
    }

    return {
        codigo: gerarCodigo(),

        criadoEm:
            new Date().toISOString(),

        nome:
            document
                .getElementById("nome")
                .value.trim(),

        telefone:
            document
                .getElementById("telefone")
                .value.trim(),

        tipoTranca:
            textoSelecionado("tipoTranca"),

        tamanho:
            textoSelecionado(
                "tamanhoTranca"
            ),

        valorTranca:
            valorSelecionado(
                "tamanhoTranca"
            ),

        material:
            textoSelecionado(
                "materialTranca"
            ),

        valorMaterial:
            textoSelecionado(
                "materialTranca"
            ) === "Material do studio"
                ? 125
                : 0,

        adicionarCilios:
            radioSelecionado(
                "adicionarCilios"
            ) === "sim",

        tipoCilios,

        atendimentoCilios,

        valorCilios,

        adicionarUnhas:
            radioSelecionado(
                "adicionarUnhas"
            ) === "sim",

        servicoUnha:
            textoSelecionado(
                "servicoUnha"
            ),

        valorUnha:
            valorSelecionado(
                "servicoUnha"
            ),

        formatoUnha:
            textoSelecionado(
                "formatoUnha"
            ),

        quantidade3D:
            Number(
                textoSelecionado(
                    "quantidade3D"
                ) || 0
            ),

        valor3D:
            valorSelecionado(
                "quantidade3D"
            ),

        unhasQuebradas:
            Number(
                textoSelecionado(
                    "unhasQuebradas"
                ) || 0
            ),

        valorUnhasQuebradas:
            valorSelecionado(
                "unhasQuebradas"
            ),

        data:
            document.getElementById(
                "data"
            ).value,

        horario:
            document.getElementById(
                "horario"
            ).value,

        observacoes:
            document
                .getElementById(
                    "observacoes"
                )
                .value.trim(),

        total:
            cotacao.total,

        itens:
            cotacao.itens
    };
}

function salvarDados() {
    const dados =
        coletarDados();

    localStorage.setItem(
        "preAgendamentoQS",
        JSON.stringify(dados)
    );

    return dados;
}

function cadastrarAgendamento() {
    if (!validarFormulario()) {
        return;
    }

    const dados =
        salvarDados();

    const mensagem = [];

    mensagem.push(
        "Olá, tudo bem? 💖"
    );

    mensagem.push("");

    mensagem.push(
        `Meu nome é ${dados.nome} e gostaria de solicitar um pré-agendamento no QS Studio.`
    );

    mensagem.push("");

    mensagem.push(
        `📋 Solicitação: ${dados.codigo}`
    );

    mensagem.push(
        `📱 WhatsApp: ${dados.telefone}`
    );

    mensagem.push(
        `📅 Data pretendida: ${formatarData(
            dados.data
        )}`
    );

    mensagem.push(
        `🕒 Horário pretendido: ${dados.horario}`
    );

    mensagem.push("");

    mensagem.push(
        "✨ TRANÇAS"
    );

    mensagem.push(
        `Modelo: ${dados.tipoTranca}`
    );

    if (dados.tamanho) {
        mensagem.push(
            `Tamanho: ${dados.tamanho}`
        );
    }

    if (
        dados.material ===
        "Cliente leva o material"
    ) {
        mensagem.push(
            "Material: vou levar meu próprio material"
        );
    }

    if (
        dados.material ===
        "Material do studio"
    ) {
        mensagem.push(
            "Material: QS Studio"
        );

        mensagem.push(
            "Estimativa do material: R$ 125,00"
        );

        mensagem.push(
            "🎨 Enviarei também a referência da cor/modelo."
        );

        mensagem.push(
            "📸 Enviarei uma foto atual do meu cabelo para avaliação."
        );
    }

    if (dados.adicionarCilios) {
        mensagem.push("");

        mensagem.push(
            "👁️ CÍLIOS"
        );

        mensagem.push(
            `Serviço: ${dados.tipoCilios}`
        );

        mensagem.push(
            `Tipo: ${
                dados.atendimentoCilios ===
                "manutencao"
                    ? "Manutenção"
                    : "Aplicação"
            }`
        );

        mensagem.push(
            `Valor: ${moeda(
                dados.valorCilios
            )}`
        );
    }

    if (dados.adicionarUnhas) {
        mensagem.push("");

        mensagem.push(
            "💅 UNHAS"
        );

        mensagem.push(
            `Serviço: ${dados.servicoUnha}`
        );

        if (
            dados.formatoUnha &&
            dados.servicoUnha !== "Mão" &&
            dados.servicoUnha !== "Pé e mão"
        ) {
            mensagem.push(
                `Formato: ${dados.formatoUnha}`
            );
        }

        if (dados.quantidade3D > 0) {
            mensagem.push(
                `Decoração 3D: ${dados.quantidade3D} unha(s)`
            );
        }

        if (
            dados.unhasQuebradas > 0
        ) {
            mensagem.push(
                `Unhas quebradas: ${dados.unhasQuebradas}`
            );
        }
    }

    mensagem.push("");

    mensagem.push(
        `💰 Valor total estimado: ${moeda(
            dados.total
        )}`
    );

    if (dados.observacoes) {
        mensagem.push("");

        mensagem.push(
            "📝 Observações:"
        );

        mensagem.push(
            dados.observacoes
        );
    }

    mensagem.push("");

    mensagem.push(
        "Estou ciente de que esta é apenas uma solicitação de pré-agendamento e que o horário ainda será conferido pelo QS Studio."
    );

    mensagem.push(
        "Após a confirmação da disponibilidade, aguardarei as instruções para pagamento do sinal de 50% para garantia da vaga."
    );

    const texto =
        encodeURIComponent(
            mensagem.join("\n")
        );

    window.open(
        `https://wa.me/${WHATSAPP_QS}?text=${texto}`,
        "_blank"
    );
}

function gerarComprovante() {
    if (!validarFormulario()) {
        return;
    }

    salvarDados();

    window.open(
        "comprovante.html",
        "_blank"
    );
}

document.addEventListener(
    "DOMContentLoaded",
    function () {
        const data =
            document.getElementById(
                "data"
            );

        if (data) {
            const hoje =
                new Date();

            const ano =
                hoje.getFullYear();

            const mes =
                String(
                    hoje.getMonth() + 1
                ).padStart(2, "0");

            const dia =
                String(
                    hoje.getDate()
                ).padStart(2, "0");

            data.min =
                `${ano}-${mes}-${dia}`;
        }

        document
            .querySelectorAll(
                'input[name="adicionarCilios"]'
            )
            .forEach(
                elemento => {
                    elemento.addEventListener(
                        "change",
                        function () {
                            atualizarBlocos();
                            calcularCotacao();
                        }
                    );
                }
            );

        document
            .querySelectorAll(
                'input[name="adicionarUnhas"]'
            )
            .forEach(
                elemento => {
                    elemento.addEventListener(
                        "change",
                        function () {
                            atualizarBlocos();
                            calcularCotacao();
                        }
                    );
                }
            );

        const campos = [
            "tipoTranca",
            "tamanhoTranca",
            "materialTranca",
            "tipoCilios",
            "tipoAtendimentoCilios",
            "servicoUnha",
            "formatoUnha",
            "quantidade3D",
            "unhasQuebradas"
        ];

        campos.forEach(
            id => {
                const elemento =
                    document.getElementById(
                        id
                    );

                if (elemento) {
                    elemento.addEventListener(
                        "change",
                        function () {
                            atualizarBlocos();
                            calcularCotacao();
                        }
                    );
                }
            }
        );

        atualizarBlocos();

        calcularCotacao();
    }
);
