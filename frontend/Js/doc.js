let cod = localStorage.getItem("codigoProcesso");
let nome = localStorage.getItem("nomeRequerente");
let req = localStorage.getItem("requerimento")
let ato = localStorage.getItem("ato")
let atvd = localStorage.getItem("atividade")
let porte = localStorage.getItem("porte")
let areaProp = localStorage.getItem("Prop")
let areaAtvd = localStorage.getItem("areaAtvd")
let cid = localStorage.getItem("nomeMunicipio")
let endereco = localStorage.getItem("Endereço")
let OpcDoc = localStorage.getItem("OpcDoc")
let OpcCar = localStorage.getItem("OpcCar")
let OpcArt = localStorage.getItem("OpcArt")

console.log(OpcCar)

const mostrar = (id, valor) => { //função pra pegar todos os elementos que vai ter o id ali, e substituir o texto por valor, e a lista retornar 0 no lugar ele coloca ??
    const elementos = document.querySelectorAll(`[data-campo='${id}']`);

    if (elementos.length === 0) return; 

    elementos.forEach(elemento => {
        elemento.textContent = valor ?? "";
    });
};


mostrar("cod", cod);
mostrar("req", req);
mostrar("nome", nome);
mostrar("ato", ato);
mostrar("porte", porte);
mostrar("atvd", atvd);
mostrar("areaProp", areaProp);
mostrar("areaAtvd", areaAtvd);
mostrar("cid", cid)
mostrar("endereco", endereco)
mostrar("OpcDoc" , OpcDoc)
mostrar("OpcCar" , OpcCar)
mostrar("OpcArt" , OpcArt)
const data  = () => {
    const hoje = new Date()
    let dia = hoje.getDate();
    let mes = hoje.toLocaleString('pt-BR', {month: 'long'});
    let ano = hoje.getFullYear();

    return "Palmas, " + dia +" de " + mes + " de " + ano;
}


let calendario = data();
mostrar("calendario", calendario)
