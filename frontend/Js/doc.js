let cod = localStorage.getItem("codProc");
let car = localStorage.getItem("codCar");
let nome = localStorage.getItem("nomeReq");
let req = localStorage.getItem("requerimento");
let ato = localStorage.getItem("ato");
let atvd = localStorage.getItem("atividade");
let porte = localStorage.getItem("porte");
let areaProp = localStorage.getItem("areaProp");
let areaAtvd = localStorage.getItem("areaAtvd");
let cid = localStorage.getItem("municipio");
let endereco = localStorage.getItem("endereco");
let dataChegada = localStorage.getItem("dataChegada");
let obs = localStorage.getItem("obs");
let cond = localStorage.getItem("cond");
let respTec = localStorage.getItem("respTec");
let opcDoc = localStorage.getItem("opcDoc");
let opcCar = localStorage.getItem("opcCar");
let opcArt = localStorage.getItem("opcArt");
let opcAgua = localStorage.getItem("opcAgua");
let opcApoio = localStorage.getItem("opcApoio");
let opcSpr = localStorage.getItem("opcSpr");
let opcInfr = localStorage.getItem("opcInfr");
let opcResi = localStorage.getItem("opcResi");
let opcCons = localStorage.getItem("opcCons");
let opcAna = localStorage.getItem("opcAna");

console.log(car);

const mostrar = (id, valor) => {
  //função pra pegar todos os elementos que vai ter o id ali, e substituir o texto por valor, e a lista retornar 0 no lugar ele coloca ??
  const elementos = document.querySelectorAll(`[data-campo='${id}']`);

  if (elementos.length === 0) return;

  elementos.forEach((elemento) => {
    elemento.textContent = valor ?? "";
  });
};

mostrar("cod", cod);
mostrar("car", car);
mostrar("req", req);
mostrar("nome", nome);
mostrar("ato", ato);
mostrar("porte", porte);
mostrar("atvd", atvd);
mostrar("areaProp", areaProp);
mostrar("areaAtvd", areaAtvd);
mostrar("cid", cid);
mostrar("endereco", endereco);
mostrar("dataChegada", dataChegada);
mostrar("Obs", obs);
mostrar("RespTec", respTec);
mostrar("Cond", cond);
mostrar("OpcDoc", opcDoc);
mostrar("OpcCar", opcCar);
mostrar("OpcArt", opcArt);
mostrar("OpcAgua", opcAgua);
mostrar("OpcApoio", opcApoio);
mostrar("OpcSpr", opcSpr);
mostrar("OpcInfr", opcInfr);
mostrar("OpcResi", opcResi);
mostrar("OpcCons", opcCons);
mostrar("OpcAna", opcAna);

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
