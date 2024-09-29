<template>
    <div class="nav-bar-container">
        <figure>
            <img src="/src/assets/nav-logo.png" @click="goToHome" alt="Logo">
        </figure>
        <div class="nav-links">
            <router-link 
                to="/" 
                class="router-link" 
                :class="{ 'active-link': route.path === '/' }"
            >
                Score de crédito
            </router-link>
            <router-link 
                to="/ativos" 
                class="router-link" 
                :class="{ 'active-link': route.path === '/ativos' }"
            >
                Ativos
            </router-link>
            <router-link 
                to="/risco-de-terceiros" 
                class="router-link" 
                :class="{ 'active-link': route.path === '/risco-de-terceiros' }"
            >
                Risco de Terceiros
            </router-link>
            <router-link 
                to="/titulos" 
                class="router-link" 
                :class="{ 'active-link': route.path === '/titulos' }"
            >
                Títulos
            </router-link>
            <router-link
                to="/users" 
                class="router-link" 
                :class="{ 'active-link': route.path === '/users' }"
                v-if="authStore.userInfo?.is_admin"
            >
                Usuários
            </router-link>
        </div>
        <div class="logout">
            <button @click="logout">SAIR</button>
        </div>
    </div>
</template>



<script>
import { useAuthStore } from "@/store/auth";
import { useRouter, useRoute } from "vue-router";
import "./styles.css";

export default {
    name: "Navbar",
    setup() {
        const authStore = useAuthStore();
        const router = useRouter();
        const route = useRoute();   

        function logout() {
            authStore.logout();
            router.push('/login');
        }

        function goToHome() {
            router.push('/');
        }

        return {
            logout,
            goToHome,
            route,
            authStore,
        };
    }
}
</script>
