/* =========================================================
   Portfólio de Ana Milca Araujo - JavaScript
   JavaScript puro, sem bibliotecas ou frameworks.
   ========================================================= */

/* ---------- 1. Tema claro/escuro ---------- */
// Botão que alterna o tema (existe em todas as páginas)
const botaoTema = document.getElementById("botao-tema");

// Aplica o tema escolhido: adiciona ou remove a classe "tema-escuro" do <body>
function aplicarTema(tema) {
  if (tema === "escuro") {
    document.body.classList.add("tema-escuro");
    botaoTema.textContent = "☀️";
    botaoTema.setAttribute("aria-label", "Ativar tema claro");
  } else {
    document.body.classList.remove("tema-escuro");
    botaoTema.textContent = "🌙";
    botaoTema.setAttribute("aria-label", "Ativar tema escuro");
  }
}

// Lê a escolha salva anteriormente (para o tema continuar igual ao trocar de página).
// O try/catch evita erro em navegadores que bloqueiam o armazenamento local.
let temaSalvo = "claro";
try {
  temaSalvo = localStorage.getItem("tema") || "claro";
} catch (erro) {
  temaSalvo = "claro";
}
aplicarTema(temaSalvo);

// Ao clicar no botão, troca o tema e salva a escolha
botaoTema.addEventListener("click", function () {
  const novoTema = document.body.classList.contains("tema-escuro") ? "claro" : "escuro";
  aplicarTema(novoTema);
  try {
    localStorage.setItem("tema", novoTema);
  } catch (erro) {
    // Se não puder salvar, o tema só vale para esta página
  }
});

/* ---------- 2. Menu responsivo (celular) ---------- */
const botaoMenu = document.getElementById("botao-menu");
const navegacao = document.getElementById("navegacao");

// Abre/fecha o menu quando o botão "hambúrguer" é clicado
botaoMenu.addEventListener("click", function () {
  const aberto = navegacao.classList.toggle("aberta");
  botaoMenu.setAttribute("aria-expanded", aberto);
  botaoMenu.textContent = aberto ? "✕" : "☰";
});

/* ---------- 3. Ano atual no rodapé ---------- */
document.getElementById("ano-atual").textContent = new Date().getFullYear();

/* ---------- 4. Formulário de contato (só existe na página contato.html) ---------- */
const formulario = document.getElementById("formulario-contato");

if (formulario) {
  const campoNome = document.getElementById("nome");
  const campoEmail = document.getElementById("email");
  const campoMensagem = document.getElementById("mensagem");
  const modal = document.getElementById("modal-sucesso");
  const botaoFecharModal = document.getElementById("fechar-modal");

  // Expressão regular que confere o formato usuario@dominio.com
  const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Mostra (ou limpa) a mensagem de erro embaixo de um campo
  function mostrarErro(campo, texto) {
    const divCampo = campo.parentElement;
    const spanErro = divCampo.querySelector(".mensagem-erro");
    spanErro.textContent = texto;
    if (texto) {
      divCampo.classList.add("com-erro");
    } else {
      divCampo.classList.remove("com-erro");
    }
  }

  // Valida todos os campos e devolve true se estiver tudo certo
  function validarFormulario() {
    let valido = true;

    // Nome: obrigatório
    if (campoNome.value.trim() === "") {
      mostrarErro(campoNome, "Por favor, informe seu nome.");
      valido = false;
    } else {
      mostrarErro(campoNome, "");
    }

    // E-mail: obrigatório e com formato válido
    if (campoEmail.value.trim() === "") {
      mostrarErro(campoEmail, "Por favor, informe seu e-mail.");
      valido = false;
    } else if (!formatoEmail.test(campoEmail.value.trim())) {
      mostrarErro(campoEmail, "E-mail inválido. Exemplo: usuario@dominio.com");
      valido = false;
    } else {
      mostrarErro(campoEmail, "");
    }

    // Mensagem: obrigatória
    if (campoMensagem.value.trim() === "") {
      mostrarErro(campoMensagem, "Por favor, escreva uma mensagem.");
      valido = false;
    } else {
      mostrarErro(campoMensagem, "");
    }

    return valido;
  }

  // Ao enviar: impede o envio real, valida e simula o envio
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault(); // não recarrega a página

    if (validarFormulario()) {
      formulario.reset();           // limpa os campos
      modal.classList.add("aberto"); // mostra "Mensagem enviada com sucesso!"
      botaoFecharModal.focus();
    }
  });

  // Fecha o modal pelo botão
  botaoFecharModal.addEventListener("click", function () {
    modal.classList.remove("aberto");
  });

  // Fecha o modal clicando fora da caixa
  modal.addEventListener("click", function (evento) {
    if (evento.target === modal) {
      modal.classList.remove("aberto");
    }
  });
}
