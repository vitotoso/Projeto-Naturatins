import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  async function aoEnviar(evento) {
    evento.preventDefault();
    setErro("");
    try {
      await login(username, password);
      navigate("/");
    } catch {
      setErro("Usuário ou senha inválidos.");
    }
  }

  return (
    <div className="tela-login">
      <form className="cartao-login" onSubmit={aoEnviar}>
        <img src="/images/naturatins-logo.png" alt="Naturatins" className="logo-login" />
        <h1>Parecer Técnico</h1>
        <div className="grupo">
          <label htmlFor="username">Usuário</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </div>
        <div className="grupo">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        {erro && <p className="mensagem-erro">{erro}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
