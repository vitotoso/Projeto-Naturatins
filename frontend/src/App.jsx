import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RotaProtegida from "./components/RotaProtegida";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Fila from "./pages/Fila";
import ProcessoForm from "./pages/ProcessoForm";
import ParecerView from "./pages/ParecerView";
import Usuarios from "./pages/Usuarios";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/processos/:id/parecer" element={<RotaProtegida><ParecerView /></RotaProtegida>} />
          <Route
            element={
              <RotaProtegida>
                <Layout />
              </RotaProtegida>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/fila" element={<Fila />} />
            <Route path="/processos/novo" element={<ProcessoForm />} />
            <Route path="/processos/:id/editar" element={<ProcessoForm />} />
            <Route
              path="/usuarios"
              element={
                <RotaProtegida papeis={["ADMIN"]}>
                  <Usuarios />
                </RotaProtegida>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
