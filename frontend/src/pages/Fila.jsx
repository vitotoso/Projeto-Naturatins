import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";

const STATUS_LABEL = {
  RASCUNHO: "Rascunho",
  EM_TRAMITE: "Em trâmite",
  APROVADO: "Aprovado",
  REPROVADO: "Reprovado",
};

export default function Fila() {
  const { usuario } = useAuth();
  const [processos, setProcessos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [tramitandoId, setTramitandoId] = useState(null);
  const [paraUsuario, setParaUsuario] = useState("");
  const [observacao, setObservacao] = useState("");

  function carregar() {
    api.get("/processos/").then(({ data }) => setProcessos(data));
  }

  useEffect(() => {
    carregar();
    api.get("/usuarios/").then(({ data }) => setUsuarios(data));
  }, []);

  async function tramitar(id) {
    await api.post(`/processos/${id}/tramitar/`, {
      para_usuario: paraUsuario,
      observacao,
    });
    setTramitandoId(null);
    setParaUsuario("");
    setObservacao("");
    carregar();
  }

  async function aprovar(id) {
    await api.post(`/processos/${id}/aprovar/`);
    carregar();
  }

  async function reprovar(id) {
    await api.post(`/processos/${id}/reprovar/`);
    carregar();
  }

  const podeAprovar = usuario?.role === "COORDENADOR" || usuario?.role === "ADMIN";

  return (
    <div className="pagina-fila">
      <h1>Fila de processos</h1>
      <table className="tabela">
        <thead>
          <tr>
            <th>Processo</th>
            <th>Requerente</th>
            <th>Município</th>
            <th>Status</th>
            <th>Responsável</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {processos.map((processo) => (
            <tr key={processo.id}>
              <td>{processo.cod_processo}</td>
              <td>{processo.nome_requerente}</td>
              <td>{processo.municipio}</td>
              <td>
                <span className={`badge badge-${processo.status?.toLowerCase()}`}>
                  {STATUS_LABEL[processo.status] ?? processo.status}
                </span>
              </td>
              <td>{processo.responsavel_atual?.username}</td>
              <td className="acoes">
                <Link to={`/processos/${processo.id}/parecer`}>Ver parecer</Link>
                <Link to={`/processos/${processo.id}/editar`}>Editar</Link>
                <button onClick={() => setTramitandoId(processo.id)}>Tramitar</button>
                {podeAprovar && (
                  <>
                    <button onClick={() => aprovar(processo.id)}>Aprovar</button>
                    <button onClick={() => reprovar(processo.id)}>Reprovar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {processos.length === 0 && (
            <tr>
              <td colSpan={6}>Nenhum processo na sua fila.</td>
            </tr>
          )}
        </tbody>
      </table>

      {tramitandoId && (
        <div className="modal-fundo" onClick={() => setTramitandoId(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Tramitar processo</h2>
            <div className="grupo">
              <label htmlFor="para_usuario">Encaminhar para</label>
              <select
                id="para_usuario"
                value={paraUsuario}
                onChange={(e) => setParaUsuario(e.target.value)}
              >
                <option value="">Selecione um usuário</option>
                {usuarios
                  .filter((u) => u.id !== usuario.id)
                  .map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.username} ({u.role})
                    </option>
                  ))}
              </select>
            </div>
            <div className="grupo">
              <label htmlFor="observacao">Observação</label>
              <textarea
                id="observacao"
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
              />
            </div>
            <div className="modal-acoes">
              <button onClick={() => tramitar(tramitandoId)} disabled={!paraUsuario}>
                Encaminhar
              </button>
              <button onClick={() => setTramitandoId(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
