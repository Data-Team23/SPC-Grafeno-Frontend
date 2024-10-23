<template>
    <div class="container">
      <h1>Listagem de Usuários</h1>
      <br>
      <br>
      <TableComponent
        :data="data"
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
import TableComponent from "../components/Table/TableComponent.vue";
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import EditModal from "@/components/EditModal.vue";
import { userApi } from "@/services/api";
import { toast } from "vue3-toastify";
'email', 'first_name', 'cpf', 'contato', 'created_at', 'updated_at', 'is_admin'
const data = ref([
    {
        'email':'joao@gmail.com',
        'first_name':'João',
        'cpf':'482.222.334-78',
        'contato':'12996778899',
        'created_at':'17/10/2024',
        'updated_at':'17/10/2024',
        'is_admin': true
    },
    {
        'email':'carlos@gmail.com',
        'first_name':'Carlos',
        'cpf':'482.222.334-78',
        'contato':'12996778899',
        'created_at':'17/10/2024',
        'updated_at':'17/10/2024',
        'is_admin': true
    },
    {
        'email':'mateus@gmail.com',
        'first_name':'Mateus',
        'cpf':'482.222.334-78',
        'contato':'12996778899',
        'created_at':'17/11/2024',
        'updated_at':'17/10/2024',
        'is_admin': true
    },
    {
        'email':'brian@gmail.com',
        'first_name':'Brian',
        'cpf':'482.222.334-78',
        'contato':'03996778899',
        'created_at':'07/10/2024',
        'updated_at':'17/10/2024',
        'is_admin': true
    },
    {
        'email':'alex@gmail.com',
        'first_name':'alex',
        'cpf':'482.222.334-78',
        'contato':'02996778899',
        'created_at':'27/10/2024',
        'updated_at':'17/10/2024',
        'is_admin': true
    },
    {
        'email':'lucas@gmail.com',
        'first_name':'Lucas',
        'cpf':'212.132.334-78',
        'contato':'42996778899',
        'created_at':'17/10/2024',
        'updated_at':'17/10/2024',
        'is_admin': true
    },
    {
        'email':'marcos@gmail.com',
        'first_name':'Marcos',
        'cpf':'482.201.334-78',
        'contato':'32996778899',
        'created_at':'17/10/2024',
        'updated_at':'17/10/2024',
        'is_admin': true
    },
    {
        'email':'moritz@gmail.com',
        'first_name':'Moritz',
        'cpf':'552.222.334-78',
        'contato':'22996778899',
        'created_at':'17/10/2024',
        'updated_at':'17/10/2024',
        'is_admin': true
    },
]);
const showConfirmationModal = ref(false);
const showEditModal = ref(false);
const currentRow = ref(null);
  
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
  
  