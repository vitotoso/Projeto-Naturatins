const form = document.querySelector("form");

form.addEventListener("submit", function(event){ // praticamente quando o formulario for enviado vai executar a função
    event.preventDefault(); // impede a paginad e recarregar e perder o processo

    let cod = document.getElementById("cod_processo").value;
    let nome = document.getElementById("nome_requerente").value;
    // let estado = document.getElementById("estado").value;
    let municipio = document.getElementById("municipio").value
    

    localStorage.setItem("codigoProcesso", cod); //setta os valores
    localStorage.setItem("nomeRequerente", nome);
    localStorage.setItem("nomeMunicipio", municipio + " - TO ");


    window.location.href = "documento.html"; //redireciona pra proxima pagina
});