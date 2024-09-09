<template>
    <div class="perfil-container">
        <h1>Perfil</h1>
        <h3>Atualize seus dados</h3>
        <form action="">
            <Input
                placeholder="Informe seu email"
                v-model="email"
            />
            <Input
                placeholder="Informe seu nome"
                v-model="name"
            />
            <Input
                placeholder="Informe seu cpf"
                v-model="cpf"
            />
            <Input
                placeholder="Informe sua senha"
                icon="fa-solid fa-lock"
                type="password"
                v-model="password"
            />
            <Button 
                :onClick="update"
                textButton="SALVAR"
            ></Button>
        </form>
    </div>
</template>

<script setup>
import Input from '../components/Input/Input.vue';
import Button from '../components/Button/Button.vue';
import { ref } from 'vue';

const email = ref('joao@example.com');
const name = ref('João Gabriel Santos');
const cpf = ref('58.641.333-45');
const password = ref('senha123');

function update() {
    event.preventDefault();
    const data = {
        email: email.value,
        name: name.value,
        cpf: cpf.value,
        password: password.value
    }
    console.log(data)
    router.push("/")
}

</script>