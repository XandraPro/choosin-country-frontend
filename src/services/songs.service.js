import api from "../api/axios";

export const getSongs = async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/songs", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}