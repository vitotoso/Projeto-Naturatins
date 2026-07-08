import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/client";

const PERGUNTAS_SIM_NAO = [
  { campo: "opc_doc", titulo: "Todos os documentos obrigatórios foram apresentados?" },
  { campo: "opc_car", titulo: "O CAR está ativo e regular?" },
  { campo: "opc_art", titulo: "A ART está regular?" },
  { campo: "opc_agua", titulo: "A atividade utiliza água diretamente?" },
  { campo: "opc_apoio", titulo: "Há uso de água para apoio?" },
  { campo: "opc_spr", titulo: "Há supressão vegetal?" },
  { campo: "opc_infr", titulo: "Há infraestrutura adequada?" },
  { campo: "opc_resi", titulo: "Há gestão adequada de resíduos?" },
  { campo: "opc_cons", titulo: "Está em Unidade de Conservação?" },
  {
    campo: "opc_ana",
    titulo: "Qual o resultado da análise?",
    opcoes: [
      ["Sim", "Favorável"],
      ["Nao", "Desfavorável"],
    ],
  },
];

const VAZIO = {
  cod_processo: "",
  cod_car: "",
  requerimento: "",
  nome_requerente: "",
  ato_administrativo: "",
  atividade: "Pecuária",
  porte: "Pequeno",
  area_propriedade: "",
  area_atividade: "",
  municipio: "",
  endereco: "",
  data_chegada: "",
  observacao: "",
  condicionante: "",
  opc_doc: "",
  opc_car: "",
  opc_art: "",
  opc_agua: "",
  opc_apoio: "",
  opc_spr: "",
  opc_infr: "",
  opc_resi: "",
  opc_cons: "",
  opc_ana: "",
  car_situacao: "",
  art_justificativa: "",
  agua_tipo: "",
  agua_justificativa: "",
  apoio_tipo: "",
  apoio_justificativa: "",
  spr_ard: "",
  classificacoes: {},
};

const OPCOES_ATIVIDADE = ["Silvicultura", "Agricultura", "Pecuária", "Suinocultura"];

const OPCOES_CAR_SITUACAO = [
  ["Deficit", "Déficit de Reserva Legal"],
  ["Conflito", "CAR em Conflito"],
];

const OPCOES_TIPO_AGUA = [
  ["DUI", "DUI"],
  ["Outorga", "Outorga"],
];

const OPCOES_CLASSIFICACAO = [
  ["PENDENCIA", "Pendência"],
  ["CONDICIONANTE", "Condicionante"],
];

function RadioGrupo({ nome, opcoes, valor, aoAlterar }) {
  return opcoes.map(([v, rotulo]) => (
    <label key={v} className="opcao-radio">
      <input type="radio" name={nome} value={v} checked={valor === v} onChange={() => aoAlterar(v)} />
      {rotulo}
    </label>
  ));
}

export default function ProcessoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dados, setDados] = useState(VAZIO);
  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/TO/municipios")
      .then((r) => r.json())
      .then((lista) => setMunicipios(lista.map((m) => m.nome)))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (id) api.get(`/processos/${id}/`).then(({ data }) => setDados(data));
  }, [id]);

  function alterar(campo, valor) {
    setDados((atual) => ({ ...atual, [campo]: valor }));
  }

  function alterarClassificacao(campo, valor) {
    setDados((atual) => ({ ...atual, classificacoes: { ...atual.classificacoes, [campo]: valor } }));
  }

  function aoMudarAreaAtividade(valor) {
    const atividade = parseFloat(valor);
    const propriedade = parseFloat(dados.area_propriedade);
    if (propriedade && atividade > propriedade) {
      alterar("area_atividade", "0");
      return;
    }
    alterar("area_atividade", valor);
  }

  async function aoEnviar(evento) {
    evento.preventDefault();
    const payload = {
      ...dados,
      data_chegada: dados.data_chegada || null,
      area_propriedade: dados.area_propriedade || null,
      area_atividade: dados.area_atividade || null,
    };
    if (id) {
      await api.patch(`/processos/${id}/`, payload);
    } else {
      await api.post("/processos/", payload);
    }
    navigate("/fila");
  }

  return (
    <form className="form-processo" onSubmit={aoEnviar}>
      <h1>{id ? "Editar Parecer" : "Novo Parecer"}</h1>

      <div className="grupo">
        <label htmlFor="cod_processo">Código do Processo</label>
        <input
          id="cod_processo"
          value={dados.cod_processo}
          onChange={(e) => alterar("cod_processo", e.target.value)}
        />
      </div>
      <div className="grupo">
        <label htmlFor="cod_car">Número do CAR</label>
        <input id="cod_car" value={dados.cod_car} onChange={(e) => alterar("cod_car", e.target.value)} />
      </div>
      <div className="grupo">
        <label htmlFor="requerimento">Requerimento</label>
        <input
          id="requerimento"
          value={dados.requerimento}
          onChange={(e) => alterar("requerimento", e.target.value)}
        />
      </div>
      <div className="grupo">
        <label htmlFor="nome_requerente">Nome do Requerente</label>
        <input
          id="nome_requerente"
          value={dados.nome_requerente}
          onChange={(e) => alterar("nome_requerente", e.target.value)}
        />
      </div>
      <div className="grupo">
        <label htmlFor="ato_administrativo">Ato administrativo</label>
        <input
          id="ato_administrativo"
          value={dados.ato_administrativo}
          onChange={(e) => alterar("ato_administrativo", e.target.value)}
        />
      </div>
      <div className="grupo">
        <label htmlFor="atividade">Atividade</label>
        <select id="atividade" value={dados.atividade} onChange={(e) => alterar("atividade", e.target.value)}>
          {OPCOES_ATIVIDADE.map((nome) => (
            <option key={nome} value={nome}>
              {nome}
            </option>
          ))}
        </select>
      </div>
      <div className="grupo">
        <label htmlFor="endereco">Endereço da Propriedade</label>
        <input id="endereco" value={dados.endereco} onChange={(e) => alterar("endereco", e.target.value)} />
      </div>
      <div className="grupo">
        <label htmlFor="data_chegada">Data de chegada do processo</label>
        <input
          id="data_chegada"
          type="date"
          value={dados.data_chegada ?? ""}
          onChange={(e) => alterar("data_chegada", e.target.value)}
        />
      </div>
      <div className="grupo">
        <label htmlFor="porte">Porte</label>
        <select id="porte" value={dados.porte} onChange={(e) => alterar("porte", e.target.value)}>
          <option value="Pequeno">Pequeno</option>
          <option value="Médio">Médio</option>
          <option value="Grande">Grande</option>
        </select>
      </div>
      <div className="grupo">
        <label htmlFor="area_propriedade">Área da Propriedade (ha)</label>
        <input
          id="area_propriedade"
          type="number"
          min="0"
          step="0.01"
          value={dados.area_propriedade ?? ""}
          onChange={(e) => alterar("area_propriedade", e.target.value)}
        />
      </div>
      <div className="grupo">
        <label htmlFor="area_atividade">Área da Atividade (ha)</label>
        <input
          id="area_atividade"
          type="number"
          min="0"
          step="0.01"
          max={dados.area_propriedade || undefined}
          value={dados.area_atividade ?? ""}
          onChange={(e) => aoMudarAreaAtividade(e.target.value)}
        />
      </div>
      <div className="grupo">
        <label htmlFor="municipio">Cidade</label>
        <input
          id="municipio"
          list="lista-cidades"
          placeholder="Digite a cidade"
          value={dados.municipio}
          onChange={(e) => alterar("municipio", e.target.value)}
        />
        <datalist id="lista-cidades">
          {municipios.map((nome) => (
            <option key={nome} value={nome} />
          ))}
        </datalist>
      </div>

      {PERGUNTAS_SIM_NAO.map(({ campo, titulo, opcoes }) => (
        <div className="grupo" key={campo}>
          <h4>{titulo}</h4>
          {(
            opcoes ?? [
              ["Sim", "Sim"],
              ["Nao", "Não"],
              ["NA", "Não se Aplica"],
            ]
          ).map(([valor, rotulo]) => (
            <label key={valor} className="opcao-radio">
              <input
                type="radio"
                name={campo}
                value={valor}
                checked={dados[campo] === valor}
                onChange={() => alterar(campo, valor)}
              />
              {rotulo}
            </label>
          ))}

          {campo === "opc_car" && dados.opc_car === "Nao" && (
            <div className="subcampo">
              <label>Situação do CAR</label>
              <RadioGrupo
                nome="car_situacao"
                opcoes={OPCOES_CAR_SITUACAO}
                valor={dados.car_situacao}
                aoAlterar={(v) => alterar("car_situacao", v)}
              />
            </div>
          )}

          {campo === "opc_art" && dados.opc_art === "Nao" && (
            <div className="subcampo">
              <label htmlFor="art_justificativa">Justifique</label>
              <textarea
                id="art_justificativa"
                value={dados.art_justificativa}
                onChange={(e) => alterar("art_justificativa", e.target.value)}
              />
            </div>
          )}

          {campo === "opc_agua" && dados.opc_agua === "Sim" && (
            <div className="subcampo">
              <label>Enquadramento</label>
              <RadioGrupo
                nome="agua_tipo"
                opcoes={OPCOES_TIPO_AGUA}
                valor={dados.agua_tipo}
                aoAlterar={(v) => alterar("agua_tipo", v)}
              />
              {(dados.agua_tipo === "DUI" || dados.agua_tipo === "Outorga") && (
                <div className="subcampo">
                  <label htmlFor="agua_justificativa">Justifique</label>
                  <textarea
                    id="agua_justificativa"
                    value={dados.agua_justificativa}
                    onChange={(e) => alterar("agua_justificativa", e.target.value)}
                  />
                </div>
              )}
            </div>
          )}

          {campo === "opc_apoio" && dados.opc_apoio === "Sim" && (
            <div className="subcampo">
              <label>Enquadramento</label>
              <RadioGrupo
                nome="apoio_tipo"
                opcoes={OPCOES_TIPO_AGUA}
                valor={dados.apoio_tipo}
                aoAlterar={(v) => alterar("apoio_tipo", v)}
              />
              {(dados.apoio_tipo === "DUI" || dados.apoio_tipo === "Outorga") && (
                <div className="subcampo">
                  <label htmlFor="apoio_justificativa">Justifique</label>
                  <textarea
                    id="apoio_justificativa"
                    value={dados.apoio_justificativa}
                    onChange={(e) => alterar("apoio_justificativa", e.target.value)}
                  />
                </div>
              )}
            </div>
          )}

          {campo === "opc_spr" && dados.opc_spr === "Sim" && (
            <div className="subcampo">
              <label htmlFor="spr_ard">ARD</label>
              <textarea
                id="spr_ard"
                value={dados.spr_ard}
                onChange={(e) => alterar("spr_ard", e.target.value)}
              />
            </div>
          )}

          {campo !== "opc_ana" && dados[campo] === "Nao" && (
            <div className="subcampo">
              <label>Classificar como</label>
              <RadioGrupo
                nome={`classificacao_${campo}`}
                opcoes={OPCOES_CLASSIFICACAO}
                valor={dados.classificacoes?.[campo] ?? ""}
                aoAlterar={(v) => alterarClassificacao(campo, v)}
              />
            </div>
          )}
        </div>
      ))}

      <div className="grupo">
        <label htmlFor="observacao">Observação</label>
        <textarea
          id="observacao"
          maxLength={500}
          value={dados.observacao}
          onChange={(e) => alterar("observacao", e.target.value)}
        />
      </div>
      <div className="grupo">
        <label htmlFor="condicionante">Condicionante</label>
        <textarea
          id="condicionante"
          maxLength={500}
          value={dados.condicionante}
          onChange={(e) => alterar("condicionante", e.target.value)}
        />
      </div>

      <div className="grupo acoes-form">
        <button type="submit">{id ? "Salvar" : "Cadastrar"}</button>
        <button type="button" onClick={() => navigate("/fila")}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
