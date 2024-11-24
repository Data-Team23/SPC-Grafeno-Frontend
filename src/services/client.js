import apiClient from "@/services/base.js";

const listClient = async () => {
    const data = await apiClient.get("/clients");
    return data;
};

const listClientByCluster = async (cluster) => {
    const data = await apiClient.get(`/clients/cluster/${cluster}`)
    return data;
}

export {
    listClient,
    listClientByCluster
}