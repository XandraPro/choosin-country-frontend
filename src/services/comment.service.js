import api from "../api/axios";

export const createComment = async (data) => {
    try {
        const res = await api.post("/comments", data);
    return res.data;
    } catch (error) {
        console.error("Comment error", error.response?.data || error);
        throw error;
    }
};
