import api from "../api/axios";

export const createComment = async (data) => {
  const res = await api.post("/comments", data);
  return res.data;
};

export const getCommentsBySong = async (songId) => {
  const res = await api.get(`/comments/${songId}`);
  return res.data.data;
};