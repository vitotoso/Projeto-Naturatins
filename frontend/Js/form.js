const form = document.querySelector("form");

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
        Nao: "O empreendedor não apresentou integralmente os documentos exigidos, sendo necessária complementação. "
    },
    OpcCar: {
        Sim: "O Cadastro Ambiental Rural encontra-se ativo e regular. ",
        Nao: "O Cadastro Ambiental Rural apresenta inconsistências, sendo necessária regularização. "
    },
    OpcArt: {
        Sim:"A Anotação de Responsabilidade Técnica encontra-se regular. ",
        Nao:"A Anotação de Responsabilidade Técnica necessita regularização. "
    },
    OpcAgua:{
        Sim:"A atividade faz uso direto de recursos hídricos com autorização válida. ",
        Nao:"A atividade faz uso direto de recursos hídricos sem autorização, sendo necessária regularização. "
    },
    OpcApoio:{
        Sim:"Verifica-se uso de água para atividades de apoio, devendo ser regularizado. ",
        Nao:"Não há uso relevante de água para apoio. "
    },
    OpcSpr:{
        Sim:"O empreendimento prevê supressão de vegetação. ",
        Nao:"O empreendimento não prevê supressão de vegetação. "
    },
    OpcInfr:{
        Sim:"Foi verificada infraestrutura compatível. ",
        Nao:"Não foi verificada infraestrutura adequada."
    },
    OpcResi:{
        Sim:"Os resíduos são gerenciados adequadamente. ",
        Nao:"Não há gestão adequada de resíduos. "
    },
    OpcCons:{
        Sim:"O empreendimento encontra-se inserido em Unidade de Conservação. ",
        Nao:"O empreendimento não se encontra inserido em Unidade de Conservação. "
    },
    OpcAna:{
        Sim:"Diante do exposto, opina-se de forma favorável à emissão da licença. ",
        Nao:"Diante do exposto, opina-se de forma desfavorável à emissão da licença. "
    }
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



form.addEventListener("submit", function(event){ // praticamente quando o formulario for enviado vai executar a função
    event.preventDefault(); // impede a paginad e recarregar e perder o processo
    const salvar = (chave, valor) => localStorage.setItem(chave, valor)
    let cod = document.getElementById("cod_processo").value;
    let nome = document.getElementById("nome_requerente").value;
    // let estado = document.getElementById("estado").value;
    let municipio = document.getElementById("municipio").value
    let requerimento = document.getElementById("requerimento").value
    let ato = document.getElementById("Ato").value
    let atividade = "Pecuária";
    let porte = document.getElementById("Porte").value
    let propriedade = document.getElementById("areaProp").value
    let areaAtividade = document.getElementById("areaAtvd").value
    let endereco = document.getElementById("Endereço").value
    const verificar = (areaAtividade,propriedade) => {"console"}
   

    const respostaDoc =document.querySelector('input[name="OpcDoc"]:checked')?.value || "";
    const OpcDoc = buscarTexto("OpcDoc", respostaDoc);
    const respostaCar =document.querySelector('input[name="OpcCar"]:checked')?.value || "";
    const OpcCar = buscarTexto("OpcCar", respostaCar);
    const respostaArt =document.querySelector('input[name="OpcArt"]:checked')?.value || "";
    const OpcArt = buscarTexto("OpcArt", respostaArt);
    const respostaAgua =document.querySelector('input[name="OpcAgua"]:checked')?.value || "";
    const OpcAgua = buscarTexto("OpcAgua", respostaAgua);
    const respostaApoio =document.querySelector('input[name="OpcApoio"]:checked')?.value || "";
    const OpcApoio = buscarTexto("OpcApoio", respostaApoio);
    const respostaSpr =document.querySelector('input[name="OpcSpr"]:checked')?.value || "";
    const OpcSpr = buscarTexto("OpcSpr", respostaSpr);
    const respostaInfr =document.querySelector('input[name="OpcInfr"]:checked')?.value || "";
    const OpcInfr = buscarTexto("OpcInfr", respostaInfr);
    const respostaResi =document.querySelector('input[name="OpcResi"]:checked')?.value || "";
    const OpcResi = buscarTexto("OpcResi", respostaResi);
    const respostaCons =document.querySelector('input[name="OpcCons"]:checked')?.value || "";
    const OpcCons = buscarTexto("OpcCons", respostaCons);
    const respostaAna =document.querySelector('input[name="OpcAna"]:checked')?.value || "";
    const OpcAna = buscarTexto("OpcAna", respostaAna);

    
    
    salvar("codigoProcesso", cod); //setta os valores
    salvar("nomeRequerente", nome);
    salvar("nomeMunicipio", municipio + " - TO ");
    salvar("requerimento", requerimento);
    salvar("ato", ato);
    salvar("atividade", atividade);
    salvar("porte", porte);
    salvar("Prop", propriedade);
    salvar("areaAtvd", areaAtividade);
    salvar("Endereço", endereco)
    salvar("OpcDoc", OpcDoc)
    salvar("OpcCar", OpcCar)
    salvar("OpcArt", OpcArt)
    salvar("OpcAgua", OpcAgua)
    salvar("OpcApoio", OpcApoio)
    salvar("OpcSpr", OpcSpr)
    salvar("OpcInfr", OpcInfr)
    salvar("OpcResi", OpcResi)
    salvar("OpcCons", OpcCons)
    salvar("OpcAna", OpcAna)



    const checkboxes = document.getElementsByName("grupo")

    window.location.href = "documento.html"; //redireciona pra proxima pagina
});