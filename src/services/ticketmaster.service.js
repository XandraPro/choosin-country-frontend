import api from "../api/axios";

export const getCountryEvents = async (countryCode = "US") => {
  const res = await api.get(`/events/country?countryCode=${countryCode}`);
  return res.data.data;
};