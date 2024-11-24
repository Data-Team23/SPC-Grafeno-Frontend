<template>
  <div class="container">
    <!-- Gráfico -->
    <div class="chart-container">
      <h1>Gráficos</h1>
      <bar-chart :chart-data="dataGraph" :options="chartOptions"></bar-chart>
    </div>

    <!-- Tabela -->
    <div class="table-container">
      <h1>Listagem de Usuários</h1>
      <Table
        :data="formattedData"
        :display-columns="['email', 'first_name', 'cpf', 'contato', 'created_at', 'updated_at', 'is_admin']"
        :column-names="['Email', 'Nome', 'CPF', 'Contato', 'Criado em:', 'Atualizado em:', 'Admin']"
        :show-delete-column="true"
        :show-edit-column="true"
        @editRow="openEditModal"
        @deleteRow="openConfirmationModal"
      />
      <ConfirmationModal
        v-if="showConfirmationModal"
        :showModal="showConfirmationModal"
        title="Confirmação de Deleção"
        message="Tem certeza que deseja excluir?"
        :action="deleteRow"
        @close="showConfirmationModal = false"
      />
      <EditModal
        v-if="showEditModal"
        :showModal="showEditModal"
        :rowData="currentRow"
        @save="updateRow"
        @close="showEditModal = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
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
import Table from "../components/Table/Table.vue";
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import EditModal from "@/components/EditModal.vue";
import { userApi } from "@/services/api";
import { toast } from "vue3-toastify";

// Configuração do gráfico
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

// Tabela de usuários
const data = ref([]);
const showConfirmationModal = ref(false);
const showEditModal = ref(false);
const currentRow = ref(null);

const fetchUsers = async () => {
  try {
    const response = await userApi.listUser();
    data.value = response.data;
  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
    toast.error("Erro ao carregar usuários.");
  }
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
  return new Intl.DateTimeFormat("pt-BR", options).format(new Date(dateString));
};

const formattedData = computed(() => {
  return data.value.map((user) => ({
    ...user,
    created_at: formatDate(user.created_at),
    updated_at: formatDate(user.updated_at),
  }));
});

onMounted(() => {
  fetchUsers();
});

const openEditModal = (row) => {
  currentRow.value = { ...row };
  showEditModal.value = true;
};

const openConfirmationModal = (row) => {
  currentRow.value = row;
  showConfirmationModal.value = true;
};

const deleteRow = async () => {
  if (!currentRow.value) return;
  try {
    const cpf = currentRow.value.cpf;
    await userApi.deleteUser(cpf);
    const index = data.value.indexOf(currentRow.value);
    if (index > -1) {
      data.value.splice(index, 1);
    }
    await fetchUsers();
    toast.success("Excluído com sucesso!!");
  } catch (error) {
    toast.error("Erro ao excluir.");
  }
  showConfirmationModal.value = false;
};

const updateRow = async (updatedData) => {
  if (!currentRow.value) return;

  try {
    const cpf = currentRow.value.cpf;
    await userApi.updateUser(cpf, updatedData);
    await fetchUsers();
    toast.success("Usuário atualizado com sucesso!");
  } catch (error) {
    toast.error("Erro ao atualizar usuário.");
  }
  showEditModal.value = false;
};
</script>

<style scoped>
/* Habilitar scroll para a página */
.container {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Espaçamento entre o gráfico e a tabela */
  padding: 20px;
  max-height: 100vh; /* Limitar a altura da página */
  overflow-y: auto; /* Scroll vertical */
}

.chart-container {
  width: 100%;
  max-width: 800px; /* Reduzir o tamanho do gráfico */
  margin: 50px auto; /* Espaçamento maior do topo */
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.table-container {
  width: 100%;
  max-width: 700px; /* Reduzir a largura da tabela */
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
}

.chart-container h1,
.table-container h1 {
  text-align: center;
  color: #333;
}

.bar-chart {
  height: 300px; /* Altura reduzida do gráfico */
  margin: 0 auto;
}
</style>
