<template>
    <div class="nav-bar-container">
        <figure>
            <router-link to="/">
                <img src="/src/assets/nav-logo.png" alt="">
            </router-link>
        </figure>
        <div class="nav-links">
            <router-link to="/" class="router-link">
                Score de crédito
            </router-link>
            <router-link class="router-link">
                Ativos
            </router-link>
            <router-link class="router-link">
                Risco de Terceiros
            </router-link>
            <router-link class="router-link">
                Títulos
            </router-link>
        </div>
        <div class="logout">
            <button @click="logout">SAIR</button>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";
import "./styles.css";

export default {
    name: "Navbar",
    setup() {
        const authStore = useAuthStore();
        const router = useRouter();

        function logout() {
            authStore.logout();
            router.push('/login');
        }

        return {
            logout
        };
    }
}
</script>
