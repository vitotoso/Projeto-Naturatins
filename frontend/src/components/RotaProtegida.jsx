import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RotaProtegida({ children, papeis }) {
  const { usuario, carregando } = useAuth();

  if (carregando) return null;
  if (!usuario) return <Navigate to="/login" replace />;
  if (papeis && !papeis.includes(usuario.role)) return <Navigate to="/" replace />;

  return children;
}
