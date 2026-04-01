import api from "../api/axios";

export const getCountryEvents = async ({
  countryCode = "US",
  keyword = "country",
  city = "",
  type = "",
  size = 12,
} = {}) => {
  const params = new URLSearchParams({
    countryCode,
    keyword,
    size: String(size),
  });

  if (city) params.append("city", city);
  if (type) params.append("type", type);

  const res = await api.get(`/events/country?${params.toString()}`);
  return res.data.data;
};