const form = document.querySelector("form");

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




    const checkboxes = document.getElementsByName("grupo")

    window.location.href = "documento.html"; //redireciona pra proxima pagina
});