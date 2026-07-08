import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshando = null;

api.interceptors.response.use(
  (resposta) => resposta,
  async (erro) => {
    const original = erro.config;
    const refreshToken = localStorage.getItem("refresh_token");

    if (erro.response?.status !== 401 || original._retry || !refreshToken) {
      return Promise.reject(erro);
    }
    original._retry = true;

    refreshando =
      refreshando ??
      axios
        .post(`${baseURL}/auth/refresh/`, { refresh: refreshToken })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access);
          return data.access;
        })
        .finally(() => {
          refreshando = null;
        });

    try {
      const novoToken = await refreshando;
      original.headers.Authorization = `Bearer ${novoToken}`;
      return api(original);
    } catch {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/login";
      return Promise.reject(erro);
    }
  },
);

export default api;
