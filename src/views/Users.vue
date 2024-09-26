<template>
    <div class="container">
        <h1>USUÁRIOS</h1>
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
import { ref } from 'vue';
import Table from '../components/Table/Table.vue';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL

const data = ref([

    {
        "_id": "648c4d8e774e6f3c3c0b5c02",
        "email": "user2@example.com",
        "first_name": "Carlos",
        "last_name": "Pereira",
        "password": "hashed_password2",
        "cpf": "23456789012",
        "contato": "987654321",
        "created_at": "2024-09-24T12:34:56Z",
        "updated_at": "2024-09-24T12:34:56Z",
        "last_login": null
    },
    {
        "_id": "648c4d8e774e6f3c3c0b5c03",
        "email": "user3@example.com",
        "first_name": "Mariana",
        "last_name": "Oliveira",
        "password": "hashed_password3",
        "cpf": "34567890123",
        "contato": "456789123",
        "created_at": "2024-09-24T12:34:56Z",
        "updated_at": "2024-09-24T12:34:56Z",
        "last_login": null
    },
    {
        "_id": "648c4d8e774e6f3c3c0b5c04",
        "email": "user4@example.com",
        "first_name": "Ricardo",
        "last_name": "Souza",
        "password": "hashed_password4",
        "cpf": "45678901234",
        "contato": "321654987",
        "created_at": "2024-09-24T12:34:56Z",
        "updated_at": "2024-09-24T12:34:56Z",
        "last_login": null
    }
]
)

axios.get(`${apiUrl}/users`)
  .then(response => {
    console.log(response.data);
    data.value = response.data
  })
  .catch(error => {
    console.error('Erro:', error);
  });
</script>