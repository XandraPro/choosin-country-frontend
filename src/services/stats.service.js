import api from "../api/axios";

export const getStats = () => {
    return api.get("/stats");
};