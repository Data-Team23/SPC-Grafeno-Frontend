<template>
  <div class="container">
    <div class="select-container">
      <h1>Listagem de Clientes</h1>
      <br><br>
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