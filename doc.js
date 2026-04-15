let cod = localStorage.getItem("codigoProcesso");
let nome = localStorage.getItem("nomeRequerente");
let municipio = localStorage.getItem("nomeMunicipio")

document.getElementById("mostrarCod").textContent = cod;
document.getElementById("mostrarNome").textContent = nome;
document.getElementById("mostrarCid").textContent = municipio;