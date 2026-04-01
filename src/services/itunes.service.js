export const searchItunes = async (query) => {
  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${query}+country&media=music&limit=20`
    );

    const data = await response.json();

    const normalizedQuery = query.toLowerCase();

    const filteredResults = data.results.filter((song) => {
      const title = song.trackName?.toLowerCase() || "";
      const artist = song.artistName?.toLowerCase() || "";
      const genre = song.primaryGenreName?.toLowerCase() || "";

      return (
        // 🔍 debe coincidir en título o artista
        (title.includes(normalizedQuery) ||
          artist.includes(normalizedQuery)) &&

        // 🤠 debe ser country
        genre.includes("country")
      );
    });

    return filteredResults;
  } catch (error) {
    console.error("iTunes API error:", error);
    return [];
  }
};
