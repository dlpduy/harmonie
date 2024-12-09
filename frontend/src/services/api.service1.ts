import axios from './axios.customize';

const logoutAPI = () => {
    const URL_BACKEND = "api/v1/auth/logout"
    return axios.post(URL_BACKEND)
}


interface ICreateProduct {
    store_id: number;
    name: string;
    brand: string;
    price: number;
    quantity: number;
    category_id: number;
    description: string;
}

interface IUpdateProduct {
    id: number;
    name: string;
    brand: string;
    price: number;
    quantity: number;
    category_id: number;
    description: string;
}

const createProductAPI = async (data: ICreateProduct) => {
    const URL_BACKEND = "api/v1/products"
    return await axios.post(URL_BACKEND, data);
}

const updateProductAPI = async (data: IUpdateProduct) => {
    const URL_BACKEND = "api/v1/products/1"
    return await axios.put(URL_BACKEND, data);
}


const fetchAllProductsinStore = async (store_id: number) => {
    const URL_BACKEND = `api/v1/store/${store_id}/all/product`
    return await axios.get(URL_BACKEND);
}



export {
    logoutAPI, createProductAPI, updateProductAPI, fetchAllProductsinStore
}