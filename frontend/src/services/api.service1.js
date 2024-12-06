
import axios from './axios.customize';
const createUserAPI = (fullName, email, password, phoneNumber) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phoneNumber
    }
    return axios.post(URL_BACKEND, data)
}

const updateUserAPI = (_id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        _id: _id,
        fullName: fullName,
        phone: phone
    }
    return axios.put(URL_BACKEND, data)
}

const deleteUserAPI = (_id) => {
    const URL_BACKEND = `/api/v1/user/${_id}`;
    //console.log(URL_BACKEND)
    return axios.delete(URL_BACKEND)
}

const uploadFileAPI = (file, folder) => {
    const URL_BACKEND = "/api/v1/file/upload";
    let config = {
        headers: {
            "upload-type": folder,
            "Content-Type": "multipart/form-data"
        }
    }
    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", file);
    return axios.post(URL_BACKEND, bodyFormData, config)
}

const fetchAllUsersAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND)
}

const updateUserAvatarAPI = (avatar, _id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        _id: _id,
        avatar: avatar,
        fullName: fullName,
        phone: phone
    }
    return axios.put(URL_BACKEND, data)
}

const registerUserAPI = (fullName, email, password, phoneNumber) => {
    const URL_BACKEND = "/api/v1/user/register";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phoneNumber
    }
    return axios.post(URL_BACKEND, data)
}

const loginUserAPI = (email, password) => {
    const URL_BACKEND = "api/v1/auth/login"
    const data = {
        username: email,
        password: password,
        delay: 1000
    }
    return axios.post(URL_BACKEND, data)
}

const getAccountAPI = () => {
    const URL_BACKEND = "api/v1/auth/get-user"
    return axios.get(URL_BACKEND)
}


const getUserInfo = async () => {
    try {
        const URL_BACKEND = "api/v1/user/get-user";
        const response = await axios.get(URL_BACKEND, {
            // gui access token kem theo request
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        });
        return response;
    } catch (error) {
        console.error("Error fetching user info:", error);
    }
};

const logoutAPI = () => {
    const URL_BACKEND = "api/v1/auth/logout"
    return axios.post(URL_BACKEND)
}






export {
    createUserAPI, updateUserAPI,
    fetchAllUsersAPI, deleteUserAPI,
    uploadFileAPI, updateUserAvatarAPI,
    registerUserAPI, loginUserAPI,
    getAccountAPI, logoutAPI, getUserInfo
}