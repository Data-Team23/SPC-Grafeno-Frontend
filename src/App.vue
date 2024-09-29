<script setup>
import { useRoute } from "vue-router";
import Navbar from "@/components/Navbar/Navbar.vue";
import Footer from "@/components/Footer/Footer.vue";
import Perfil from "@/views/Perfil.vue";
import { ref } from "vue";
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore()

const route = useRoute();
const showModal = ref(false);

function openModal() {
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}
</script>

<template>
  <header v-if="route.path !== '/login' && route.path !== '/register'">
    <Navbar />
    <i class="fa-solid fa-user" @click="openModal"></i>
  </header>

  <Perfil
    v-if="showModal"
    :showModal="showModal"
    :userInfo="authStore.userInfo"
    @close="closeModal"
  />

  <main>
    <router-view></router-view>
  </main>

  <footer v-if="route.path !== '/login' && route.path !== '/register'">
    <Footer />
  </footer>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
