import apiClient from "@/services/base.js";

const createUser = async (payload) => {
    const data = await apiClient.post(`/users/register/`, payload);
    return data;
};

const updateUser = async (cpf, payload) => {
    const data = await apiClient.put(`/user/members/${cpf}/`, payload);
    return data;
};

const deleteUser = async (cpf) => {
    await apiClient.delete(`/user/members/${cpf}/`);
};

const loginUser = async (payload) => {
    const data = await apiClient.post(`/user/token/`, payload);
    return data;
};

const loginUserWithGoogle = async () => {
    const googleAuthUrl = "http://localhost:8000/api/v1/user/auth/google/";
    window.location.href = googleAuthUrl;
};

const listUser = async () => {
    const data = await apiClient.get("/user/members/");
    return data;
};

const verifyCode = async (payload) => {
    const data = await apiClient.post(`/user/verify/`, payload);
    return data;
};

export {
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    loginUserWithGoogle,
    listUser,
    verifyCode,
};
