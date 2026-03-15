
export const searchItunes= async (query => {

    const response = await fetch('https://itunes.apple.com/search?term=${query}&media=music&limit=10');

    const data = await response.data;

    return data.results;
});
