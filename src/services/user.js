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
    const data = await apiClient.get("/user/auth/google/");
    return data
};

export {
    createUser,
    loginUser,
    loginUserWithGoogle,
}