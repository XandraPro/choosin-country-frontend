import api from "../api/axios";

// get token from local storage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {  Authorization: `Bearer ${token}` };
};

// get all songs
export const getSongs = async () => {
  const response = await api.get("/songs", { headers: getAuthHeaders() });
  return response.data;
};

// create a new song
export const createSong = async (songData) => {
  const response = await api.post("/songs", songData, { headers: getAuthHeaders() });
  return response.data;
};

// update a song
export const updateSong = async (id, songData) => {
  const response = await api.put(`/songs/${id}`, songData, { headers: getAuthHeaders() });
  return response.data;
};

// delete a song
export const deleteSong = async (id) => {
  const response = await api.delete(`/songs/${id}`, { headers: getAuthHeaders() });
  return response.data;
};  