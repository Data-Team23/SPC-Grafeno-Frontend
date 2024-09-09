<template>

    <div class="login-container">
        <div class="login-box">
            <div class="login-text">
                <figure>
                    <img src="/src/assets//nav-logo.png" alt="">
                </figure>
                <h1>Bem-vindo de volta</h1>
                <h3>Acesse sua conta agora mesmo.</h3>
            </div>
            <router-link to="/login">
                <Button 
                    textButton="ENTRAR"
                ></Button>
            </router-link>
            <div class="lgpd">
                Nosso sistema está em conformidade com a Lei Geral de Proteção de Dados (LGPD). Garantimos a segurança e a privacidade dos seus dados, seguindo todas as normas de proteção.
            </div>

        </div>
        <div class="login-form">
            <h1>Crie sua conta</h1>
            <h3>Preencha seus dados</h3>
            <form action="">
                <Input
                    placeholder="Nome completo"
                    icon="fa-solid fa-user"
                    v-model="name"
                />
                <Input
                    placeholder="CPF ou CNPJ"
                    icon="fa-solid fa-id-card"
                    v-model="cpf"
                />
                <Input
                    placeholder="Email"
                    v-model="email"
                />
                <Input
                    placeholder="Contato"
                    icon="fa-solid fa-phone"
                    v-model="contact"
                />
                <Input
                    placeholder="Senha"
                    icon="fa-solid fa-lock"
                    type="password"
                    v-model="password"
                />
                <Input
                    placeholder="Confirmação senha"
                    icon="fa-solid fa-lock"
                    type="password"
                    v-model="confirmPassword"
                />
                <Button 
                    :onClick="register"
                    textButton="CADASTRAR"
                ></Button>
            </form>
            <Footer></Footer>
        </div>

    </div>
    
</template>

<script setup>
import Input from '../components/Input/Input.vue';
import Button from '../components/Button/Button.vue';
import Footer from '../components/Footer/Footer.vue';
import "../assets/styles.css"
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref('');
const cpf = ref('');
const email = ref('');
const contact = ref('');
const password = ref('');
const confirmPassword = ref('');

const router = useRouter()

function register() {
    event.preventDefault();
    const data = {
        name: name.value,
        cpf: cpf.value,
        email: email.value,
        contact: contact.value,
        password: password.value
    }
    console.log(data)
    router.push("/login")
}

</script>
