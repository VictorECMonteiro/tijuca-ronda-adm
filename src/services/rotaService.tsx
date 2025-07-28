import { api } from "../api/serviceapi";

export async function definirUsuarioNaRota(idRota: number, idUsuario: number) {
  const res = await api.post("/rota/defUser", {
    idRota,
    idUsuario,
  });
  return res.data;
}
