import apiClient from "@/services/base.js";
import axios from "axios";

const listClient = async () => {
    // const data = await axios.get("http://localhost:8000/analyze/clusters");
    const response = await axios.get("/mock/clients.json")
    const data = response.data
    return data;
};

const listClientByCluster = async (cluster) => {
    // const response = await axios.get("http://localhost:8000/analyze/clusters")
    const response = await axios.get("/mock/clients.json")
    const data = response.data  
    const filteredData = data.filter(client => client.Cluster === Number(cluster))
    console.log(filteredData)
    return filteredData;
}

const metricGraph = async () => {
    // const data = await axios.get("http://localhost:8000/admin/analyze/centers");
    const response = await axios.get("/mock/metric_graph.json")
    const data = response.data 
    console.log(data)
    return data;
}

export {
    listClient,
    listClientByCluster,
    metricGraph
}