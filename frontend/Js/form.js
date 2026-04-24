const form = document.querySelector("form");
const propriedade = document.getElementById("areaProp");
function buscarTexto(tipo, resposta) {
  if (!regras[tipo]) {
    return "";
  }

  if (resposta === "Sim") {
    return regras[tipo].Sim;
  }

  if (resposta === "Nao") {
    return regras[tipo].Nao;
  }

  return "";
}

const regras = {
  OpcDoc: {
    Sim: "O empreendedor apresentou integralmente os documentos exigidos. ",
    Nao: "O empreendedor não apresentou integralmente os documentos exigidos, sendo necessária complementação. ",
  },
  OpcCar: {
    Sim: "O Cadastro Ambiental Rural encontra-se ativo e regular. ",
    Nao: "O Cadastro Ambiental Rural apresenta inconsistências, sendo necessária regularização. ",
  },
  OpcArt: {
    Sim: "A Anotação de Responsabilidade Técnica encontra-se regular. ",
    Nao: "A Anotação de Responsabilidade Técnica necessita regularização. ",
  },
  OpcAgua: {
    Sim: "A atividade faz uso direto de recursos hídricos com autorização válida. ",
    Nao: "A atividade faz uso direto de recursos hídricos sem autorização, sendo necessária regularização. ",
  },
  OpcApoio: {
    Sim: "Verifica-se uso de água para atividades de apoio, devendo ser regularizado. ",
    Nao: "Não há uso relevante de água para apoio. ",
  },
  OpcSpr: {
    Sim: "O empreendimento prevê supressão de vegetação. ",
    Nao: "O empreendimento não prevê supressão de vegetação. ",
  },
  OpcInfr: {
    Sim: "Foi verificada infraestrutura compatível. ",
    Nao: "Não foi verificada infraestrutura adequada.",
  },
  OpcResi: {
    Sim: "Os resíduos são gerenciados adequadamente. ",
    Nao: "Não há gestão adequada de resíduos. ",
  },
  OpcCons: {
    Sim: "O empreendimento encontra-se inserido em Unidade de Conservação. ",
    Nao: "O empreendimento não se encontra inserido em Unidade de Conservação. ",
  },
  OpcAna: {
    Sim: "Diante do exposto, opina-se de forma favorável à emissão da licença. ",
    Nao: "Diante do exposto, opina-se de forma desfavorável à emissão da licença. ",
  },
};

const textareas = document.querySelectorAll("textarea");

textareas.forEach(function (textarea) {
  textarea.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });
});

function atualizarContador(textarea, contador) {
  contador.textContent = `${textarea.value.length} / ${textarea.maxLength}`;
}

document.querySelectorAll(".grupo").forEach(function (campo) {
  const textarea = campo.querySelector("textarea");
  const contador = campo.querySelector(".contador");

  if (!textarea || !contador) return;

  atualizarContador(textarea, contador);

  textarea.addEventListener("input", function () {
    atualizarContador(textarea, contador);
  });
});

form.addEventListener("submit", function (event) { 
  event.preventDefault(); 

  const salvarInput = (id) => {
    const valor = document.getElementById(id).value;
    localStorage.setItem(id, valor);
  };

  const salvarBox = (nome) => {
    const resposta =
      document.querySelector(`input[name="${nome}"]:checked`)?.value || "";
    const valor = buscarTexto(nome, resposta);
    localStorage.setItem(nome, valor);
  };
  salvarInput("cod_processo");
  salvarInput("nome_requerente");
  salvarInput("municipio");
  salvarInput("requerimento");
  salvarInput("Ato");
  salvarInput("Porte");
  salvarInput("areaProp");
  salvarInput("areaAtvd");
  salvarInput("Endereço");

  localStorage.setItem("atividade", "Pecuária");

  salvarBox("OpcDoc");
  salvarBox("OpcCar");
  salvarBox("OpcArt");
  salvarBox("OpcAgua");
  salvarBox("OpcApoio");
  salvarBox("OpcSpr");
  salvarBox("OpcInfr");
  salvarBox("OpcResi");
  salvarBox("OpcCons");
  salvarBox("OpcAna");

  const checkboxes = document.getElementsByName("grupo");

  window.location.href = "documento.html"; 
}); 

function monitoramento(nome, just, alvo) {
  const op = document.querySelectorAll(`input[name="${nome}"]`);
  const justificativa = document.getElementById(just);

  if (!op.length || !justificativa) return;

  function atualizar() {
    const selecionado = document.querySelector(`input[name="${nome}"]:checked`);
    const valor = selecionado ? selecionado.value : null;

    justificativa.style.display = valor === alvo ? "block" : "none";
  }

  op.forEach((radio) => {
    radio.addEventListener("change", atualizar);
  });

  atualizar();
}

monitoramento("OpcDoc", "justificativaDocs", "Nao");
monitoramento("exemplos", "justify", "outros");

propriedade.addEventListener("input", function (event) {
  const atvElement = document.getElementById("areaAtvd");
  const atv = parseFloat(atvElement.value);
  const prop = parseFloat(propriedade.value);
  atvElement.max = prop;
  if (atv > prop) {
    atvElement.value = 0;
    throw new Error(
      "Valor da area de atividade maior que a area de propriedade",
    );
  }
});
