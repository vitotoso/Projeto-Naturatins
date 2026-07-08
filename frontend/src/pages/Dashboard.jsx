import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import api from "../api/client";

const AZUL_SEQUENCIAL = "#2a78d6";
const STATUS_COR = {
  RASCUNHO: "#898781",
  EM_TRAMITE: "#fab219",
  APROVADO: "#0ca30c",
  REPROVADO: "#d03b3b",
};
const STATUS_LABEL = {
  RASCUNHO: "Rascunho",
  EM_TRAMITE: "Em trâmite",
  APROVADO: "Aprovado",
  REPROVADO: "Reprovado",
};

function StatTile({ label, value }) {
  return (
    <div className="stat-tile">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  );
}

export default function Dashboard() {
  const [resumo, setResumo] = useState(null);

  useEffect(() => {
    api.get("/dashboard/resumo/").then(({ data }) => setResumo(data));
  }, []);

  if (!resumo) return <p>Carregando…</p>;

  const porMes = resumo.por_mes.map((item) => ({
    mes: new Date(item.mes).toLocaleDateString("pt-BR", { month: "short", year: "2-digit" }),
    total: item.total,
  }));

  return (
    <div className="pagina-dashboard">
      <h1>Dashboard</h1>

      <div className="grade-stats">
        <StatTile label="Total de processos" value={resumo.total} />
        <StatTile label="Pareceres favoráveis" value={resumo.favoravel} />
        <StatTile label="Pareceres desfavoráveis" value={resumo.desfavoravel} />
      </div>

      <div className="grade-graficos">
        <div className="cartao-grafico">
          <h2>Processos por status</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={resumo.por_status}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e1e0d9" />
              <XAxis
                dataKey="status"
                tickFormatter={(valor) => STATUS_LABEL[valor] ?? valor}
                tick={{ fill: "#52514e", fontSize: 12 }}
              />
              <YAxis allowDecimals={false} tick={{ fill: "#52514e", fontSize: 12 }} />
              <Tooltip formatter={(valor) => [valor, "Processos"]} labelFormatter={(v) => STATUS_LABEL[v] ?? v} />
              <Bar dataKey="total" radius={[4, 4, 0, 0]} maxBarSize={24}>
                {resumo.por_status.map((item) => (
                  <Cell key={item.status} fill={STATUS_COR[item.status] ?? AZUL_SEQUENCIAL} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="cartao-grafico">
          <h2>Top municípios</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={resumo.por_municipio} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e1e0d9" />
              <XAxis type="number" allowDecimals={false} tick={{ fill: "#52514e", fontSize: 12 }} />
              <YAxis
                type="category"
                dataKey="municipio"
                width={110}
                tick={{ fill: "#52514e", fontSize: 12 }}
              />
              <Tooltip formatter={(valor) => [valor, "Processos"]} />
              <Bar dataKey="total" fill={AZUL_SEQUENCIAL} radius={[0, 4, 4, 0]} maxBarSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="cartao-grafico">
          <h2>Processos por técnico responsável</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={resumo.por_tecnico}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e1e0d9" />
              <XAxis dataKey="responsavel_atual__username" tick={{ fill: "#52514e", fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fill: "#52514e", fontSize: 12 }} />
              <Tooltip formatter={(valor) => [valor, "Processos"]} />
              <Bar dataKey="total" fill={AZUL_SEQUENCIAL} radius={[4, 4, 0, 0]} maxBarSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="cartao-grafico">
          <h2>Evolução mensal</h2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={porMes}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e1e0d9" />
              <XAxis dataKey="mes" tick={{ fill: "#52514e", fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fill: "#52514e", fontSize: 12 }} />
              <Tooltip formatter={(valor) => [valor, "Processos"]} />
              <Area
                type="monotone"
                dataKey="total"
                stroke={AZUL_SEQUENCIAL}
                strokeWidth={2}
                fill={AZUL_SEQUENCIAL}
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
