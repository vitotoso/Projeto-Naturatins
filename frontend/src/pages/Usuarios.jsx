import { useEffect, useState } from "react";
import api from "../api/client";

const VAZIO = { username: "", email: "", password: "", role: "ANALISTA" };

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [novo, setNovo] = useState(VAZIO);

  function carregar() {
    api.get("/usuarios/").then(({ data }) => setUsuarios(data));
  }

  useEffect(carregar, []);

  async function criar(evento) {
    evento.preventDefault();
    await api.post("/usuarios/", novo);
    setNovo(VAZIO);
    carregar();
  }

  return (
    <div className="pagina-usuarios">
      <h1>Usuários</h1>

      <table className="tabela">
        <thead>
          <tr>
            <th>Usuário</th>
            <th>E-mail</th>
            <th>Papel</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Novo usuário</h2>
      <form className="form-usuario" onSubmit={criar}>
        <div className="grupo">
          <label htmlFor="username">Usuário</label>
          <input
            id="username"
            value={novo.username}
            onChange={(e) => setNovo({ ...novo, username: e.target.value })}
            required
          />
        </div>
        <div className="grupo">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={novo.email}
            onChange={(e) => setNovo({ ...novo, email: e.target.value })}
          />
        </div>
        <div className="grupo">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            value={novo.password}
            onChange={(e) => setNovo({ ...novo, password: e.target.value })}
            required
          />
        </div>
        <div className="grupo">
          <label htmlFor="role">Papel</label>
          <select id="role" value={novo.role} onChange={(e) => setNovo({ ...novo, role: e.target.value })}>
            <option value="ANALISTA">Analista</option>
            <option value="COORDENADOR">Coordenador</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <button type="submit">Criar usuário</button>
      </form>
    </div>
  );
}
