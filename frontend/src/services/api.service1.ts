import axios from './axios.customize';

const getAccessToken = () => {
    return localStorage.getItem('access_token');
}


const registerAPI = (data: any) => {
    const URL_BACKEND = "api/v1/users/register"
    return axios.post(URL_BACKEND, data)
}

const loginAPI = (data: any) => {
    const URL_BACKEND = "api/v1/users/login"
    return axios.post(URL_BACKEND, data)
}

const loginGoogleAPI = (tokenGoogle: any) => {
    const URL_BACKEND = "api/v1/users/login-social"
    const config = {
        headers: {
            Authorization: `Bearer ${tokenGoogle}`,
        },
    }
    return axios.post(URL_BACKEND, {}, config)
}


const logoutAPI = () => {
    const URL_BACKEND = "api/v1/auth/logout"
    return axios.post(URL_BACKEND)
}

const forgotPasswordAPI = (data: any) => {
    const URL_BACKEND = "api/v1/users/forgot-password"
    return axios.post(URL_BACKEND, data)
}

const updatePasswordAPI = (data: any) => {
    const URL_BACKEND = "api/v1/users/update-password"
    return axios.put(URL_BACKEND, data)
}

const getUserLoginAPI = () => {
    const URL_BACKEND = "api/v1/users/get-user"
    const token = getAccessToken()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return axios.get(URL_BACKEND, config)
}

const getProfileAPI = () => {
    const URL_BACKEND = "api/v1/users/profile"
    const token = getAccessToken()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return axios.get(URL_BACKEND, config)
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
    const token = getAccessToken()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return await axios.post(URL_BACKEND, data, config);
}

const updateProductAPI = async (data: IUpdateProduct) => {
    const URL_BACKEND = "api/v1/products/1"
    return await axios.put(URL_BACKEND, data);
}


const fetchAllProductsinStore = async (store_id: number) => {
    const URL_BACKEND = `api/v1/store/${store_id}/all/product`
    const token = getAccessToken()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return await axios.get(URL_BACKEND, config);
}



export {
    registerAPI, loginAPI, loginGoogleAPI, logoutAPI,
    getUserLoginAPI, forgotPasswordAPI, updatePasswordAPI, getProfileAPI,
    createProductAPI, updateProductAPI, fetchAllProductsinStore
}