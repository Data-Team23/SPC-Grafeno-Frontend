<template>
    <div class="container">
      <h1>Listagem de Usuários</h1>
      <br>
      <br>
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
  </template>
  
<script setup>
import { ref, onMounted, computed } from "vue";
import Table from "../components/Table/Table.vue";
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import EditModal from "@/components/EditModal.vue";
import { userApi } from "@/services/api";
import { toast } from "vue3-toastify";

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
    return data.value.map(user => ({
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
  
  