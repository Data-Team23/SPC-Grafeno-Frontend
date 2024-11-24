import apiClient from "@/services/base.js";
import axios from "axios";

const listClient = async () => {
    // const data = await apiClient.get("/clients");
    const response = await axios.get("../../public/mock/clients.json")
    const data = response.data
    return data;
};

const listClientByCluster = async (cluster) => {
    // const data = await apiClient.get(`/clients/cluster/${cluster}`)
    const response = await axios.get("../../public/mock/clients.json")
    const data = response.data
    const filteredData = data.filter(client => client.Cluster === Number(cluster))
    return filteredData;
}

export {
    listClient,
    listClientByCluster
}