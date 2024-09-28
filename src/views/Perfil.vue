<template>
  <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">✖</button>
      <h1 class="modal-title">Perfil</h1>
      <h3 class="modal-subtitle">Atualize seus dados</h3>
      <form @submit.prevent="update" class="form">
        <Input placeholder="Informe seu email" v-model="email" />
        <Input placeholder="Informe seu nome" v-model="name" />
        <Input placeholder="Informe seu CPF" v-model="cpf" />
        <Input
          placeholder="Informe sua senha"
          icon="fa-solid fa-lock"
          type="password"
          v-model="password"
        />
        <div class="button-group">
          <Button textButton="Salvar" class="button-save" />
          <Button textButton="Exportar CSV" @click="exportCSV" class="button-export" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import Input from "@/components/Input/Input.vue";
import Button from "@/components/Button/Button.vue";

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  }
});
const emits = defineEmits(["close"]);

const apiUrl = import.meta.env.VITE_API_URL

const email = ref("");
const name = ref("");
const cpf = ref("");
const password = ref("");

function update() {
  const data = {
    email: email.value,
    name: name.value,
    cpf: cpf.value,
    password: password.value
  };
  console.log(data);
  closeModal();
}

function exportCSV() {
  const data = [
    ["Email", "Nome", "CPF", "Senha"],
    [email.value, name.value, cpf.value, password.value]
  ];

  let csvContent = "data:text/csv;charset=utf-8," 
    + data.map(e => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "perfil_dados.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function closeModal() {
  emits("close");
}
</script>

<style scoped>
.modal-content {
  background: white;
  padding: 40px;
  border-radius: 10px;
  width: 450px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  text-align: center;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
}

.modal-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.modal-subtitle {
  font-size: 18px;
  margin-bottom: 20px;
  color: #555;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.button-save, .button-export {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  flex: 1;
  margin: 0 5px;
}

.button-export {
  background-color: #007BFF;
}
</style>
