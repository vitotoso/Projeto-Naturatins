const inputs = {
  cod: "codProc",
  car: "codCar",
  nome: "nomeReq",
  nomeProp: "nomeProp",
  req: "requerimento",
  ato: "ato",
  atvd: "atividade",
  porte: "porte",
  areaProp: "areaProp",
  areaAtvd: "areaAtvd",
  cid: "municipio",
  endereco: "endereco",
  lat: "lat",
  long: "long",
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
  OpcAna: "opcAna",
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
  let valor = localStorage.getItem(chave);

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
  const elemento = document.querySelector(".page");

  const opcoes = {
    margin: [10, 0, 10, 0], // margem top, right, bottom, left (em mm)
    filename: "documento.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2, // melhor resolução
      useCORS: true, // evita erro com imagens externas
      scrollY: 0,
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    },
    pageBreak: {
      mode: ["css", "legacy"], // evita cortes dentro de elementos
      before: ".secao-titulo",
    },
  };

  html2pdf().set(opcoes).from(elemento).save();
});
