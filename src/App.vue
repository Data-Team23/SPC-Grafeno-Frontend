<script setup>
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar/Navbar.vue';
import Footer from './components/Footer/Footer.vue';

const apiUrl = import.meta.env.VITE_API_URL

const route = useRoute();

</script>

<template>
  <header v-if="route.path !== '/login' && route.path !== '/register'">
    <Navbar/>
    <router-link to="/perfil">
      <i class="fa-solid fa-user"></i>
    </router-link>
  </header>
  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped>

</style>
