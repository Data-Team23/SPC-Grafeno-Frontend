<template>
  <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <label class="close-button" @click="closeModal">✖</label>
      <h1 class="modal-title">Perfil</h1>
      <h3 class="modal-subtitle">Atualize seus dados</h3>
      <form @submit.prevent="update" class="form">
        <Input placeholder="Primeiro nome" v-model="userInfo.first_name" />
        <Input placeholder="Último nome" v-model="userInfo.last_name" />
        <Input placeholder="Número para contato" v-model="userInfo.contato" :mask="'(##) #####-####'" />
        <div class="button-group">
          <Button textButton="Salvar" class="button-save" />
          <Button textButton="Exportar CSV" @click="exportCSV" class="button-export" />
          <Button textButton="Deletar conta" @click="deleteUser" class="button-delete" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import Input from "@/components/Input/Input.vue";
import Button from "@/components/Button/Button.vue";
import { toast } from "vue3-toastify";
import { userApi } from "@/services/api";

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
  userInfo: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(["close"]);

async function update() {
  const data = {
    first_name: props.userInfo.first_name,
    last_name: props.userInfo.last_name,
    contato: props.userInfo.contato,
  };

  try {
    await userApi.updateUser(props.userInfo.cpf, data);
    toast.success("Dados atualizados com sucesso!");
  } catch {
    toast.error("Falha na atualização dos dados");
  }

}

function exportCSV() {
  const data = [
    ["Nome", "Sobrenome", "Contato"],
    [props.userInfo.first_name, props.userInfo.last_name, props.userInfo.contato]
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

function deleteUser() {
  console.log("Deletando usuário:", props.userInfo.id);
  closeModal();
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

.button-save, .button-export, .button-delete {
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

.button-delete {
  background-color: #f44336;
}
</style>
