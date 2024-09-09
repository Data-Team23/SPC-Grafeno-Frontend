<template>
    <div class="nav-bar-container">
        <figure>
            <img src="/src/assets//nav-logo.png" alt="">
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
            <router-link to="/login">
                <button>SAIR</button>
            </router-link>
        </div>
    </div>
</template>

<script>
import "./styles.css"
export default {
    name: "Navbar",
    props: {}
}
</script>