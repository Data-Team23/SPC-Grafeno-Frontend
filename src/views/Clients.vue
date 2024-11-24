<template>
  <div class="container">
    <div class="graph-container">
      <h1>Métricas RFM</h1>
      <br>
      <Select v-model="selectedCluster" :options="filterOptions" placeholder="Selecione o cluster">
      </Select>
      <TableComponent :data="data" :display-columns="['participant_id', 'R', 'F', 'M', 'Cluster']"
      :column-names="['Payment', 'Ressência', 'Frequência', 'Valor Monetário (R$)', 'Cluster']" />
      <div class="graph">
        <bar-chart :chart-data="dataGraph" :options="chartOptions"></bar-chart>
      </div>
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

const dataGraph = {
  labels: ["Cluster 1", "Cluster 2", "Cluster 3", "Cluster 4"], // Eixo X
  datasets: [
    {
      label: "Recência (R)",
      data: [10, 20, 15, 25], // Valores de R para cada cluster
      backgroundColor: "#3B82F6",
      borderColor: "#2563EB",
      borderWidth: 1,
    },
    {
      label: "Frequência (F)",
      data: [12, 18, 22, 30], // Valores de F para cada cluster
      backgroundColor: "#10B981",
      borderColor: "#059669",
      borderWidth: 1,
    },
    {
      label: "Valor Monetário (M)",
      data: [8, 25, 20, 35], // Valores de M para cada cluster
      backgroundColor: "#F59E0B",
      borderColor: "#D97706",
      borderWidth: 1,
    },
  ],
};

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

const data = ref([
  {
    'participant_id': '00d69eec-21b4-470b-b21b-cb3932bb7fdb',
    'R': -1.107455,
    'F': -0.512976,
    'M': -0.123997,
    'Cluster': 3
  },
  {
    'participant_id': '00d69eec-21b4-720b-b21b-cb3932bb7fdb',
    'R': -1.525339,
    'F': -0.512976,
    'M': -0.514783,
    'Cluster': 2
  },
  {
    'participant_id': '00d69eec-21b4-230b-b21b-cb3932bb7fdb',
    'R': -1.105839,
    'F': -0.594475,
    'M': -0.734687,
    'Cluster': 1
  },
  {
    'participant_id': '00d69eec-21b4-771b-b21b-cb3932bb7fdb',
    'R': -0.905739,
    'F': -0.512976,
    'M': -0.821553,
    'Cluster': 4
  },
  {
    'participant_id': '00d69eec-21b4-445b-b21b-cb3932bb7fdb',
    'R': -1.658839,
    'F': -0.098976,
    'M': -0.712645,
    'Cluster': 2
  },
  {
    'participant_id': '00d69eec-21b4-192b-b21b-cb3932bb7fdb',
    'R': -1.105839,
    'F': -0.232976,
    'M': 0.265691,
    'Cluster': 13
  }
]);
const selectedCluster = ref("");

onMounted(() => {
  console.log("Chamando fetchClients");
  // fetchClients();
});

watch(selectedCluster, (cluster) => {
  if (cluster === "") {
    console.log("Chamando fetchClients");
    // fetchClients();
  } else {
    console.log("Chamando fetchClientsByCluster com cluster:", cluster);
    // fetchClientsByCluster(cluster);
  }
});

const fetchClients = async () => {
  try {
    const response = await clientApi.listClient();
    data.value = response.data;
  } catch (error) {
    console.error("Erro ao carregar clientes:", error);
    toast.error("Erro ao carregar clientes.");
  }
};

const fetchClientsByCluster = async (cluster) => {
  try {
    const response = await clientApi.listClientByCluster(cluster)
    data.value = response.data;
  } catch (error) {
    console.error("Erro ao carregar clientes:", error);
    toast.error("Erro ao carregar clientes.");
  }
};



</script>