import api from '../api/axios';

export const saveSong = async (songData) => {
    return api.post('/songs', songData);
};

export const playSong = (id) => {
    return api.get(`/songs/${id}/play`);
};

export const getTrendingSongs = () => {
    return api.get('/songs/trending');
};

export const getRanking = () => {
    return api.get('/songs/ranking');
};