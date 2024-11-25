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
const selectedCluster = ref(null);
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
    data.value = response;
  } catch (error) {
    console.error("Erro ao carregar clientes:", error);
    toast.error("Erro ao carregar clientes.");
  }
};

const updateGraphData = async () => {
  try {
    const response = await clientApi.metricGraph();  // Chama a API para pegar os dados
    console.log(response)
    const data = response;

    if (typeof data !== 'object' || data === null) {
      console.error("A resposta da API não é um objeto válido:", data);
      toast.error("Erro ao carregar dados do gráfico. Resposta inválida.");
      return;
    }

    // Labels são as chaves do objeto (os nomes dos clusters)
    const labels = Object.keys(data);  // Extrai os nomes dos clusters ("Cluster 1", "Cluster 2", etc.)

    const RData = labels.map(label => data[label].R);
    const FData = labels.map(label => data[label].F);
    const MData = labels.map(label => data[label].M);

    // Atualiza os dados do gráfico
    dataGraph.value = {
      labels, // Usamos os índices dos clusters como labels
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
  } catch (error) {
    console.error("Erro ao carregar dados para o gráfico:", error);
    toast.error("Erro ao carregar dados para o gráfico.");
  }
};


onMounted(() => {
  updateGraphData()
});

watch(selectedCluster, async (newCluster) => {
  if (!newCluster) {
    // Sem cluster selecionado, carrega todos os clientes
    await fetchClients();
  } else {
    // Com cluster selecionado, filtra por cluster
    await fetchClientsByCluster(newCluster);
  }
}, { immediate: true });

</script>