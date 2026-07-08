import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function sair() {
    logout();
    navigate("/login");
  }

  return (
    <div className="layout">
      <header className="topo">
        <div className="marca">
          <img src="/images/naturatins-logo.png" alt="Naturatins" />
          <span>Naturatins</span>
        </div>
        <nav>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/fila">Fila</NavLink>
          <NavLink to="/processos/novo">Novo Parecer</NavLink>
          {usuario?.role === "ADMIN" && <NavLink to="/usuarios">Usuários</NavLink>}
        </nav>
        <div className="usuario-logado">
          <span>
            {usuario?.username} · {usuario?.role}
          </span>
          <button onClick={sair}>Sair</button>
        </div>
      </header>
      <main className="conteudo-app">
        <Outlet />
      </main>
    </div>
  );
}
