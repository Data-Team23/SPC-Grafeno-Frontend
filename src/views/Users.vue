<template>
    <div class="container">
        <h1>Listagem de Usuários</h1>
        <br>
        <br>
        <Table
            :data="data"
            :display-columns="['email', 'first_name', 'cpf', 'contato', 'created_at', 'updated_at']"
            :column-names="['Email', 'Nome', 'CPF', 'Contato', 'Criado em:', 'Atualizado em:']"
            :show-delete-column="true">
        </Table>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Table from "../components/Table/Table.vue";
import { userApi } from "@/services/api";
import { toast } from "vue3-toastify";

const data = ref([]);

const fetchUsers = async () => {
    try {
        const response = await userApi.listUser();
        data.value = response.data;
    } catch (error) {
        console.error("Erro ao carregar usuários:", error);
        toast.error("Erro ao carregar usuários.");
    }
};

onMounted(() => {
    fetchUsers();
});
</script>
