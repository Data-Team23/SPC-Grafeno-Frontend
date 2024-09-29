<template>
    <div class="container">
        <h1>Listagem de Usuários</h1>
        <br>
        <br>
        <Table
            :data="formattedData"
            :display-columns="['email', 'first_name', 'cpf', 'contato', 'created_at', 'updated_at']"
            :column-names="['Email', 'Nome', 'CPF', 'Contato', 'Criado em:', 'Atualizado em:']"
            :show-delete-column="true">
        </Table>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
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

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
    return new Intl.DateTimeFormat("pt-BR", options).format(new Date(dateString));
};

const formattedData = computed(() => {
    return data.value.map(user => ({
        ...user,
        created_at: formatDate(user.created_at),
        updated_at: formatDate(user.updated_at)
    }));
});

onMounted(() => {
    fetchUsers();
});
</script>
