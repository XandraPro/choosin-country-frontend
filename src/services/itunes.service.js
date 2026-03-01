import axios from 'axios';

export const searchiTunes = async (term) => {
    const response = await axios.get(`https://itunes.apple.com/search`,
        {
            params: {
                term,
                media: 'music',
                limit: 10,
            },
        }
    );
    return response.data.results;
};  