let cod = localStorage.getItem("cod_processo");
let car = localStorage.getItem("cod_car");
let nome = localStorage.getItem("nome_requerente");
let req = localStorage.getItem("requerimento")
let ato = localStorage.getItem("Ato")
let atvd = localStorage.getItem("atividade")
let porte = localStorage.getItem("Porte")
let areaProp = localStorage.getItem("areaProp")
let areaAtvd = localStorage.getItem("areaAtvd")
let cid = localStorage.getItem("municipio")
let endereco = localStorage.getItem("Endereco")
let dataChegada = localStorage.getItem("dataChegada")
let OpcDoc = localStorage.getItem("OpcDoc")
let OpcCar = localStorage.getItem("OpcCar")
let OpcArt = localStorage.getItem("OpcArt")
let OpcAgua = localStorage.getItem("OpcAgua")
let OpcApoio = localStorage.getItem("OpcApoio")
let OpcSpr = localStorage.getItem("OpcSpr")
let OpcInfr = localStorage.getItem("OpcInfr")
let OpcResi = localStorage.getItem("OpcResi")
let OpcCons = localStorage.getItem("OpcCons")
let OpcAna = localStorage.getItem("OpcAna")

console.log()


const mostrar = (id, valor) => { //função pra pegar todos os elementos que vai ter o id ali, e substituir o texto por valor, e a lista retornar 0 no lugar ele coloca ??
    const elementos = document.querySelectorAll(`[data-campo='${id}']`);

    if (elementos.length === 0) return; 

    elementos.forEach(elemento => {
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
mostrar("cid", cid)
mostrar("endereco", endereco)
mostrar("dataChegada", dataChegada)
mostrar("OpcDoc" , OpcDoc)
mostrar("OpcCar" , OpcCar)
mostrar("OpcArt" , OpcArt)
mostrar("OpcAgua" , OpcAgua)
mostrar("OpcApoio" , OpcApoio)
mostrar("OpcSpr" , OpcSpr)
mostrar("OpcInfr" , OpcInfr)
mostrar("OpcResi" , OpcResi)
mostrar("OpcCons" , OpcCons)
mostrar("OpcAna" , OpcAna)




const data  = () => {
    const hoje = new Date()
    let dia = hoje.getDate();
    let mes = hoje.toLocaleString('pt-BR', {month: 'long'});
    let ano = hoje.getFullYear();

    return "Palmas, " + dia +" de " + mes + " de " + ano;
}


let calendario = data();
mostrar("calendario", calendario)

const imprimir = document.getElementById("impressao");

imprimir.addEventListener("click", () =>{
    html2pdf().from(document.querySelector(".page")).save()
})