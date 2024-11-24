<template>
  <div class="container">
    <div class="graph-container">
      <h1>Métricas RFM</h1>
      <div class="graph">
        <bar-chart :chart-data="dataGraph" :options="chartOptions"></bar-chart>
      </div>
      <Select v-model="selectedCluster" :options="filterOptions" placeholder="Selecione o cluster">
      </Select>
      <TableComponent :data="data" :display-columns="['participant_id', 'R', 'F', 'M', 'Cluster']"
      :column-names="['Payment', 'Ressência', 'Frequência', 'Valor Monetário (R$)', 'Cluster']" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import Select from "@/components/Select/Select.vue";
import TableComponent from "../components/Table/TableComponent.vue";
import { toast } from "vue3-toastify";
import { clientApi } from "../services/api";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    BarController,
    LineController,
    PointElement,
} from "chart.js";
import { BarChart } from "vue-chart-3";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement, 
  BarController,
  LineController
);

const dataGraph = ref({});

const chartOptions = {
  responsive: true, // Gráfico responsivo
  maintainAspectRatio: false, // Permite altura personalizada
  scales: {
    x: {
      beginAtZero: true,
    },
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
  },
};

const filterOptions = ref([
  {
    label: 'Cluster 1',
    value: 1,
  },
  {
    label: 'Cluster 2',
    value: 2,
  },
  {
    label: 'Cluster 3',
    value: 3,
  },
  {
    label: 'Cluster 4',
    value: 4,
  },
])

const data = ref([]);
const selectedCluster = ref("");
const filteredData = ref([]);

const fetchClients = async () => {
  try {
    const response = await clientApi.listClient();
    data.value = response;
  } catch (error) {
    console.error("Erro ao carregar clientes:", error);
    toast.error("Erro ao carregar clientes.");
  }
};

const fetchClientsByCluster = async (cluster) => {
  try {
    const response = await clientApi.listClientByCluster(cluster)
    console.log(response)
    data.value = response;
  } catch (error) {
    console.error("Erro ao carregar clientes:", error);
    toast.error("Erro ao carregar clientes.");
  }
};

const updateGraphData = () => {
  const clusterData = {
    "Cluster 1": { R: 1.28, F: -0.62, M: -0.99 },
    "Cluster 2": { R: -0.70, F: -0.45, M: -0.69 },
    "Cluster 3": { R: 0.65, F: 2.01, M: 0.63 },
    "Cluster 4": { R: -0.63, F: -0.16, M: 1.11 },
  };

  // Labels fixas
  const labels = ["Cluster 1", "Cluster 2", "Cluster 3", "Cluster 4"];

  // Extrair os dados para os datasets
  const RData = labels.map((label) => clusterData[label].R);
  const FData = labels.map((label) => clusterData[label].F);
  const MData = labels.map((label) => clusterData[label].M);

  dataGraph.value = {
    labels,
    datasets: [
      {
        label: "Recência (R)",
        data: RData,
        backgroundColor: "#241C4C",
      },
      {
        label: "Frequência (F)",
        data: FData,
        backgroundColor: "#CCD326",
      },
      {
        label: "Valor Monetário (M)",
        data: MData,
        backgroundColor: "#FB923C",
      },
    ],
  };
};

onMounted(() => {
  console.log("Chamando fetchClients");
  updateGraphData()
  fetchClients();
});

watch([data, selectedCluster], ([newData, newCluster]) => {
  if (newCluster === "") {
    fetchClients(); // Se o cluster for vazio, carrega todos os clientes
  } else {
    fetchClientsByCluster(newCluster); // Caso contrário, carrega os clientes filtrados por cluster
    updateGraphData(); // Atualiza o gráfico baseado no cluster selecionado
  }
},  { immediate: true });







</script>