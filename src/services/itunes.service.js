export const searchItunes = async (query) => {
  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${query}&media=music&limit=10`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("iTunes API error:", error);
    return [];
  }
};
