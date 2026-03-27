import api from "../api/axios";

export const getStats = async () => {
  const res = await api.get("/stats");
  return res.data;
};