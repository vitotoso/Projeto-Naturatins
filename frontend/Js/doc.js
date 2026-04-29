const inputs = {
  cod: "codProc",
  car: "codCar",
  nome: "nomeReq",
  req: "requerimento",
  ato: "ato",
  atvd: "atividade",
  porte: "porte",
  areaProp: "areaProp",
  areaAtvd: "areaAtvd",
  cid: "municipio",
  endereco: "endereco",
  dataChegada: "dataChegada",
  Obs: "obs",
  Cond: "cond",
  RespTec: "respTec",
  OpcDoc: "opcDoc",
  OpcCar: "opcCar",
  OpcArt: "opcArt",
  OpcAgua: "opcAgua",
  OpcApoio: "opcApoio",
  OpcSpr: "opcSpr",
  OpcInfr: "opcInfr",
  OpcResi: "opcResi",
  OpcCons: "opcCons",
  OpcAna: "opcAna"
};




const mostrar = (id, valor) => {
  //função pra pegar todos os elementos que vai ter o id ali, e substituir o texto por valor, e a lista retornar 0 no lugar ele coloca ??
  const elementos = document.querySelectorAll(`[data-campo='${id}']`);

  if (elementos.length === 0) return;

  elementos.forEach((elemento) => {
    elemento.textContent = valor ?? "";
  });
};
const comHa = ["areaProp", "areaAtvd"];

Object.entries(inputs).forEach(([campo, chave]) => {
  let valor = localStorage.getItem(chave)

  if (comHa.includes(chave)) {
    valor = (valor ?? "") + " ha";
  }
  mostrar(campo, valor);
});


const data = () => {
  const hoje = new Date();
  let dia = hoje.getDate();
  let mes = hoje.toLocaleString("pt-BR", { month: "long" });
  let ano = hoje.getFullYear();

  return "Palmas, " + dia + " de " + mes + " de " + ano;
};

let calendario = data();
mostrar("calendario", calendario);

const imprimir = document.getElementById("impressao");

imprimir.addEventListener("click", () => {
  html2pdf().from(document.querySelector(".page")).save();
});
