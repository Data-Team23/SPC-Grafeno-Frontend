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
            <div class="lgpd">
                Nosso sistema está em conformidade com a Lei Geral de Proteção de Dados (LGPD). Garantimos a segurança e a privacidade dos seus dados, seguindo todas as normas de proteção.
            </div>

        </div>
        <div class="login-form">
            <h1>Acesse sua conta</h1>
            <h3>Preencha seus dados</h3>
            <form action="">
                <Input
                    placeholder="Informe seu email"
                    v-model="email"
                />
                <Input
                    placeholder="Informe sua senha"
                    icon="fa-solid fa-lock"
                    type="password"
                    v-model="password"
                />
                <Button 
                    :onClick="login"
                    textButton="ACESSAR"
                ></Button>
                <br>
                <router-link to="/register">
                    <h5>Cadastre-se</h5>
                </router-link>
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

const email = ref('');
const password = ref('');

const router = useRouter()

function login() {
    event.preventDefault();
    const data = {
        email: email.value,
        password: password.value
    }
    console.log(data)
    router.push("/")
}

</script>
