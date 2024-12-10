import axios from './axios.customize';
    const accessToken = ''; 

const fetchCartItemsAPI = async () => {
    const URL_BACKEND = "/api/v1/productincart/1";

    try {
        const response = await axios.get(URL_BACKEND, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log('API response:', response.data);
        return response;
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
};



const deleteCartItemAPI = async (userId: number, productId: number) => {
    const URL_BACKEND = `/api/v1/productincart/delete/${userId}/${productId}`;


    try {
        const response = await axios.delete(URL_BACKEND, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log('API response:', response.data);
        return response;
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
};

export {
    fetchCartItemsAPI,
    deleteCartItemAPI
};