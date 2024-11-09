<template>
    <div class="container">
      <div class="select-container">
        <Select
          v-model="selectedCluster"
          :options="filterOptions"
          placeholder="Selecione o cluster">
        </Select>
      </div>
      <br>
      <TableComponent
        :data="data"
        :display-columns="['participant_id', 'R', 'F', 'M', 'Cluster']"
        :column-names="['Payment', 'Ressência', 'Frequência', 'Valor Monetário (R$)', 'Cluster']"
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
  </template>
  
<script setup>
import { onMounted, ref } from "vue";
import Table from "../components/Table/Table.vue";
import Select from "@/components/Select/Select.vue";
import TableComponent from "../components/Table/TableComponent.vue";
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import EditModal from "@/components/EditModal.vue";
import { userApi } from "@/services/api";
import { toast } from "vue3-toastify";

const selectedCluster = ref("");
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
    'participant_id':'00d69eec-21b4-470b-b21b-cb3932bb7fdb',
    'R': -1.105839,
    'F': -0.512976,
    'M': -0.734680, 
    'Cluster': 1      
  },
  {
    'participant_id':'00d69eec-21b4-470b-b21b-cb3932bb7fdb',
    'R': -1.105839,
    'F': -0.512976,
    'M': -0.734680, 
    'Cluster': 1      
  },
  {
    'participant_id':'00d69eec-21b4-470b-b21b-cb3932bb7fdb',
    'R': -1.105839,
    'F': -0.512976,
    'M': -0.734680, 
    'Cluster': 1      
  },
  {
    'participant_id':'00d69eec-21b4-470b-b21b-cb3932bb7fdb',
    'R': -1.105839,
    'F': -0.512976,
    'M': -0.734680, 
    'Cluster': 1      
  },
  {
    'participant_id':'00d69eec-21b4-470b-b21b-cb3932bb7fdb',
    'R': -1.105839,
    'F': -0.512976,
    'M': -0.734680, 
    'Cluster': 1      
  },
  {
    'participant_id':'00d69eec-21b4-470b-b21b-cb3932bb7fdb',
    'R': -1.105839,
    'F': -0.512976,
    'M': -0.734680, 
    'Cluster': 1      
  }
]);
const showConfirmationModal = ref(false);
const showEditModal = ref(false);
const currentRow = ref(null);

onMounted(() => {
  console.log(selectedCluster.value)
})
  
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
  
  