import { AxiosResponse } from 'axios';
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

const createProductAPI = async (data: ICreateProduct) => {
    const URL_BACKEND = "api/v1/products"
    return await axios.post(URL_BACKEND, data);


}



export {
    logoutAPI, createProductAPI
}