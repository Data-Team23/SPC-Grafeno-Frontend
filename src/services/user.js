import apiClient from "@/services/base.js";

const createUser = async (payload) => {
    const data = await apiClient.post(`/user/members/`, payload);
    return data
};

const loginUser = async (payload) => {
    const data = await apiClient.post(`/user/token/`, payload);
    return data
};

const loginUserWithGoogle = async () => {
    const googleAuthUrl = "http://localhost:8000/api/v1/user/auth/google/";
    window.location.href = googleAuthUrl;
};

export {
    createUser,
    loginUser,
    loginUserWithGoogle,
}