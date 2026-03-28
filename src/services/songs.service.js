import api from "../api/axios";

export const saveSong = async (songData) => {
  const res = await api.post("/songs/save", songData);
  return res.data;
};

export const getTrendingSongs = async () => {
  return api.get("/songs/trending");
};

export const getRanking = async () => {
  return api.get("/songs/ranking");
};

export const playSong = async (trackId) => {
  return api.post(`/songs/${trackId}/play`);
};

export const getMySongs = async () => {
  const res = await api.get("/songs/my-songs");
  return res.data;
};

export const deleteMySong = async (songId) => {
  const res = await api.delete(`/songs/my-songs/${songId}`);
  return res.data;
};

export const voteSong = async (songId) => {
  const res = await api.post(`/songs/${songId}/vote`);
  return res.data;
};