import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/client";
import "./ParecerView.css";

function formatarData(valor) {
  if (!valor) return "";
  const [ano, mes, dia] = valor.split("-");
  return `${dia}/${mes}/${ano}`;
}

function dataHoje() {
  const hoje = new Date();
  const dia = hoje.getDate();
  const mes = hoje.toLocaleString("pt-BR", { month: "long" });
  const ano = hoje.getFullYear();
  return `Palmas, ${dia} de ${mes} de ${ano}.`;
}

export default function ParecerView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [processo, setProcesso] = useState(null);

  useEffect(() => {
    api.get(`/processos/${id}/`).then(({ data }) => setProcesso(data));
  }, [id]);

  if (!processo) return <p>Carregando…</p>;

  const t = processo.textos ?? {};

  return (
    <div className="parecer-wrapper">
      <div className="page">
        <div className="cabecalho">
          <div className="logo-area">
            <div className="logo-box">
              <img src="/images/naturatins-logo.png" width="200" alt="Naturatins" />
            </div>
            <div className="logo-box">
              <img src="/images/tocantins-governo.png" alt="Governo do Tocantins" />
            </div>
          </div>
          <div className="cabecalho-texto">
            302 Norte, Alameda 01, Lote 03 – Plano Diretor Norte – Palmas/TO
            <br />
            CEP: 77006-336 | TEL.: (63) 3218-2600 | www.to.gov.br/naturatins
          </div>
        </div>

        <div className="titulo-doc">Parecer Técnico</div>
        <div className="cidade-data">{dataHoje()}</div>

        <section>
          <div className="secao-titulo">Dados Gerais</div>
          <div className="dado-row">
            <span className="dado-label">Processo:</span>
            <span className="dado-valor">{processo.cod_processo}</span>
          </div>
          <div className="dado-row">
            <span className="dado-label">CAR:</span>
            <span className="dado-valor">{processo.cod_car}</span>
          </div>
          <div className="dado-row">
            <span className="dado-label">Requerimento:</span>
            <span className="dado-valor">{processo.requerimento}</span>
          </div>
          <div className="dado-row">
            <span className="dado-label">Requerente:</span>
            <span className="dado-valor">{processo.nome_requerente}</span>
          </div>
          <div className="dado-row">
            <span className="dado-label">Ato Administrativo:</span>
            <span className="dado-valor">{processo.ato_administrativo}</span>
          </div>
          <div className="dado-row">
            <span className="dado-label">Atividade:</span>
            <span className="dado-valor">{processo.atividade}</span>
          </div>
          <div className="dado-row">
            <span className="dado-label">Porte:</span>
            <span className="dado-valor">{processo.porte}</span>
          </div>
          <div className="dado-row">
            <span className="dado-label">Área da Propriedade:</span>
            <span className="dado-valor">{processo.area_propriedade} ha</span>
          </div>
          <div className="dado-row">
            <span className="dado-label">Área de Atividade:</span>
            <span className="dado-valor">{processo.area_atividade} ha</span>
          </div>
          <div className="dado-row">
            <span className="dado-label">Município:</span>
            <span className="dado-valor">{processo.municipio}</span>
          </div>
        </section>

        <section>
          <div className="secao-titulo">Análise</div>
          <p className="texto-corpo">
            O presente Parecer Técnico remete-se à análise da documentação apresentada com vistas à emissão da{" "}
            <strong>{processo.ato_administrativo}</strong> do empreendimento pertencente à{" "}
            <strong>{processo.nome_requerente}</strong>, com atividade de {processo.atividade}; {processo.porte}{" "}
            porte, localizado na propriedade {processo.endereco} zona rural do município de {processo.municipio}.
          </p>
          <p className="texto-corpo">
            {t.opc_doc} {t.opc_car} {t.opc_art}
          </p>
          <p className="texto-corpo">
            {t.opc_agua} {t.opc_apoio}
          </p>
          <p className="texto-corpo">
            {t.opc_spr} {t.opc_infr} {t.opc_resi}
          </p>
          <p className="texto-corpo">{t.opc_cons}</p>
          <p className="texto-corpo">
            Esta análise foi subsidiada pelos parâmetros elencados no Termo de Referência para elaboração do Projeto
            Ambiental – {processo.atividade} na Resolução COEMA n° 07/2005 para empreendimento de agropecuário e na
            Relação de Documentos Necessários ao Licenciamento Ambiental para Empreendimentos do Grupo agropecuário.
          </p>
          <p className="texto-corpo">
            Conforme requerimento, a data de entrada do referido processo foi em{" "}
            {formatarData(processo.data_chegada)}, onde foram apresentados os documentos listados:
          </p>
          <ul className="lista">
            <li>Cópia dos documentos pessoais e comprovante de endereço;</li>
            <li>Projeto Ambiental (PA);</li>
            <li>Comprovante de pagamento da taxa de licenciamento;</li>
            <li>
              Anotação de Responsabilidade Técnica - ART Nº [NÚMERO ART], [NOME DO RESPONSÁVEL TÉCNICO];
            </li>
            <li>Cópia da publicação da solicitação da Licença Ambiental no Diário Oficial do Estado;</li>
            <li>Certidão de Uso do Solo expedida pelo município em relação ao empreendimento;</li>
            <li>Certidão de Inteiro Teor do Cartório de Registro de Imóveis;</li>
            <li>Shape da área de atividade e da propriedade;</li>
            <li>Recibo de inscrição no SIGCAR com status ativo.</li>
          </ul>
          <p className="texto-corpo">
            Na análise documental do processo, verificou-se que o empreendedor não apresentou todos os documentos
            necessários ao Licenciamento Ambiental para o empreendimento pertencente ao grupo [GRUPO] (Conforme
            Resolução COEMA nº [NÚMERO/ANO] – Anexo I).
          </p>

          {processo.pendencias?.length > 0 && (
            <>
              <p className="pendencias-titulo">PENDÊNCIAS:</p>
              <ol className="lista-pendencias">
                {processo.pendencias.map((texto, indice) => (
                  <li key={indice}>{texto}</li>
                ))}
              </ol>
            </>
          )}

          <p className="texto-corpo">
            Todas as informações apresentadas são de responsabilidade do responsável técnico, [NOME DO RESPONSÁVEL
            TÉCNICO], ART Nº [NÚMERO ART].
          </p>
        </section>

        <section>
          <p className="texto-corpo">
            <strong>Informações do Projeto Ambiental</strong>
          </p>
          <p className="texto-corpo">
            A propriedade [NOME DA PROPRIEDADE], matrícula [NÚMERO], está localizada nas coordenadas geográficas:
            latitude [LAT] S e longitude [LONG] O. Foi apresentado no estudo ambiental a solicitação do licenciamento
            para atividade de {processo.atividade}, com área total do projeto de {processo.area_atividade} ha.
            [DESCRIÇÃO COMPLEMENTAR DO PROJETO AMBIENTAL].
          </p>
          <p className="texto-corpo">[DESCRIÇÃO SOBRE RESÍDUOS, EFLUENTES E MEDIDAS MITIGADORAS].</p>
          <p className="texto-corpo">
            Ressalta-se que a análise realizada se refere às informações apresentadas no processo, desta forma a
            veracidade das informações apresentadas são de responsabilidade do empreendedor e responsável técnico, em
            eventuais hipóteses de questionamentos.
          </p>
        </section>

        <section>
          <div className="secao-titulo">Recomendações</div>
          <p className="texto-corpo">
            Na análise do requerimento da licença foram utilizadas informações prestadas pelo proprietário no
            Cadastro Ambiental Rural – CAR Declaratório. As informações prestadas no CAR Declaratório serão analisadas
            pelo Naturatins para fins de validação/aprovação do cadastro.
          </p>
          <p className="texto-corpo">
            Caso a propriedade ou posse rural possua déficit de vegetação nativa para instituir a reserva legal na
            propriedade nos percentuais exigidos pelo art. 12 da Lei Federal nº 12.651/2012 e tenha ocorrido supressão
            irregular de vegetação após 22/07/2008, <strong>ESTA LICENÇA NÃO AUTORIZA</strong> à continuidade das
            atividades na área que deverá ser destinada a <strong>RESERVA LEGAL</strong> na propriedade, tendo em
            vista que esta deverá ser objeto de recomposição ou regeneração natural.
          </p>
          <p className="texto-corpo">
            Caso seja verificada omissão ou declaração falsa de informações esta licença será suspensa e/ou cancelada,
            sem prejuízo da aplicação das sanções administrativas, cíveis e penais cabíveis.
          </p>
          <p className="texto-corpo">
            O empreendedor é responsável pelo cumprimento das medidas mitigadoras propostas no Estudo Ambiental.
          </p>
        </section>

        <section>
          <div className="secao-titulo">Observações</div>
          <p className="texto-corpo">{processo.observacao}</p>
        </section>

        <section>
          <div className="secao-titulo">Condicionantes</div>
          {processo.condicionantes_geradas?.length > 0 && (
            <ol className="lista-pendencias">
              {processo.condicionantes_geradas.map((texto, indice) => (
                <li key={indice}>{texto}</li>
              ))}
            </ol>
          )}
          {processo.condicionante && <p className="texto-corpo">{processo.condicionante}</p>}
        </section>

        <section>
          <div className="secao-titulo">Conclusão</div>
          <p className="texto-corpo">
            <strong>Parecer:</strong> Diante do exposto, manifesta-se de forma {t.opc_ana} à emissão da Licença
            pleiteada para a atividade.
          </p>
        </section>

        <div className="assinatura">
          <div className="linha-assinatura" />
          <div className="assinatura-nome">[NOME DO TÉCNICO RESPONSÁVEL]</div>
          <div className="assinatura-cargo">[DEPARTAMENTO / ÓRGÃO]</div>
        </div>
      </div>
      <div className="acoes-parecer">
        <button type="button" className="botao-voltar" onClick={() => navigate(-1)}>
          ← Voltar
        </button>
        <button onClick={() => window.print()}>Imprimir / Salvar PDF</button>
      </div>
    </div>
  );
}
