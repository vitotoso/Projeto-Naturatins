document.addEventListener("DOMContentLoaded", () => {

  const select_cidade = document.getElementById("municipio");
//   const select_estado = document.getElementById("estado");
  /* função para pegar os estados
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(dados => dados.json())
    .then(estados => {
      estados.forEach(estado => {
        const op = document.createElement("option");
        op.value = estado.sigla;
        op.textContent = estado.nome;
        select_estado.appendChild(op);
      });
    });
    
  select_estado.addEventListener("change", () => {
    const estadoEscolhido = select_estado.value;

    if (!estadoEscolhido) return;
*/
const listaCidades = document.getElementById("lista-cidades");

fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/TO/municipios")
    .then(resposta => resposta.json())
    .then(municipios => {
        listaCidades.innerHTML = "";

        municipios.forEach(municipio => {
            const opcao = document.createElement("option");

            opcao.value = municipio.nome;

            listaCidades.appendChild(opcao);
        });
    })
    .catch(erro => {
        console.error("Erro ao buscar municípios:", erro);
    })});