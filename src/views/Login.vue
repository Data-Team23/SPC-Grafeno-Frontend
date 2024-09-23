<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-text">
                <figure>
                    <img src="/src/assets/nav-logo.png" alt="Logo">
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
            <form @submit.prevent="login">
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
                <div class="register-container">
                    <router-link to="/register">
                        <h5>Cadastre-se</h5>
                    </router-link>
                </div>
                <div class="button-container">
                    <Button 
                        textButton="ACESSAR"
                    ></Button>
                    <button type="button" class="button-google" @click="loginWithGoogle">LOGIN COM GOOGLE</button>
                </div>
                <br>
            </form>
            <Footer></Footer>
        </div>
    </div>
</template>

<script setup>
import Input from "@/components/Input/Input.vue";
import Button from "@/components/Button/Button.vue";
import Footer from "@/components/Footer/Footer.vue";
import "@/assets/styles.css";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useAuthStore } from "@/store/auth";
import { userApi } from "@/services/api";

const email = ref("");
const password = ref("");

const router = useRouter();
const authStore = useAuthStore();

async function login() {
    const data = {
        email: email.value,
        password: password.value
    };

    try {
        const response = await userApi.loginUser(data);
        const { access, refresh } = response.data;

        if (access && refresh) {
            authStore.login(access, refresh);
            toast.success("Login bem-sucedido!");

            router.push("/");
        } else {
            toast.error("Falha no login: tokens não recebidos.");
        }
    } catch (error) {
        toast.error("Erro ao realizar login.");
        console.error("Erro no login:", error);
    }
}

async function loginWithGoogle() {
    await userApi.loginUserWithGoogle();
}

async function handleGoogleCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access");
    const refreshToken = urlParams.get("refresh");

    if (accessToken && refreshToken) {
        authStore.login(accessToken, refreshToken);
        toast.success("Login via Google bem-sucedido!");

        router.push("/");
    } else {
        toast.error("Erro ao processar login com Google.");
    }
}

if (window.location.search.includes("code=")) {
    handleGoogleCallback();
}
</script>
