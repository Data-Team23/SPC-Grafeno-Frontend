
<template>
  <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <label class="close-button" @click="closeModal">✖</label>
      <h1 class="modal-title">Perfil</h1>
      <h3 class="modal-subtitle">Atualize seus dados</h3>
      <div class="form">
        <Input placeholder="Primeiro nome" v-model="userInfo.first_name" />
        <Input placeholder="Último nome" v-model="userInfo.last_name" />
        <div class="user-info">
          <label class="label-title">CPF:</label>
          <span class="info-text">{{ userInfo.cpf }}</span>
        </div>
        <div class="user-info">
          <label class="label-title">Contato:</label>
          <span class="info-text">{{ userInfo.contato }}</span>
        </div>
        <div class="button-group">
          <Button textButton="Salvar" @click="update" class="button-save" />
          <Button textButton="Exportar CSV" @click="exportCSV" class="button-export" />
          <Button textButton="Visualizar Termos" @click="openTermsModal" class="button-terms" />
          <Button textButton="Revogar Consentimento" @click="openRevocationModal" class="button-revoke" />
          <Button textButton="Deletar conta" @click="openConfirmationModal" class="button-delete" />
        </div>
      </div>
    </div>
    <ConfirmationModal
      v-if="showConfirmationModal"
      :showModal="showConfirmationModal"
      title="Confirmação de Deleção"
      message="Tem certeza que deseja deletar sua conta? Você será deslogado do sistema!"
      :action="deleteUser"
      @close="closeConfirmationModal"
    />
    <RevogueConsence
      v-if="showRevocationModal"
      :showModal="showRevocationModal"
      title="Revogação de Consentimento"
      message="Você está prestes a revogar o consentimento para o uso de seus dados pessoais. Isso resultará na exclusão de sua conta e de todas as suas informações associadas."
      :action="deleteUser"
      @close="closeRevocationModal"
    />
    <div v-if="showTermsModal" class="modal-overlay" @click.self="closeTermsModal">
    <div class="modal-content">
      <label class="close-button" @click="closeTermsModal">✖</label>
      <h3>Termos de Condição</h3>
      <p>
        1. <strong>Uso de Dados Pessoais:</strong> Seus dados pessoais, como nome, CPF, e-mail e número de contato, serão coletados e utilizados exclusivamente para fins de registro e para melhorar a experiência do usuário em nossa plataforma.
      </p>
      <p>
        2. <strong>Finalidade do Tratamento dos Dados:</strong> Os dados coletados podem ser utilizados para:
        <br> - Comunicação sobre novidades, atualizações e ofertas;
        <br> - Personalização de conteúdos e anúncios;
        <br> - Melhoria de nossos serviços com base em suas preferências;
        <br> - Atendimento ao cliente e suporte.
      </p>
      <p>
        3. <strong>Direitos do Usuário:</strong> Você tem o direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento.
      </p>
      <p>
        4. <strong>Cookies e Tecnologias Similares:</strong> Utilizamos cookies e tecnologias semelhantes para garantir a melhor experiência em nosso site.
      </p>
      <p>
        5. <strong>Revogação do Consentimento:</strong> Você pode revogar seu consentimento a qualquer momento, resultando na exclusão de sua conta.
      </p>
      <p>
        6. <strong>Modificações nos Termos:</strong> Reservamo-nos o direito de modificar estes termos a qualquer momento.
      </p>
      <div class="button-group">
        <Button textButton="Fechar" @click="closeTermsModal" class="button-close" />
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import Input from "@/components/Input/Input.vue";
import Button from "@/components/Button/Button.vue";
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import RevogueConsence from "../components/Perfil/RevogueConsence.vue";
import { toast } from "vue3-toastify";
import { userApi } from "@/services/api";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";

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
const showConfirmationModal = ref(false);
const showRevocationModal = ref(false);
const showTermsModal = ref(false);
const router = useRouter();

function openTermsModal() {
  showTermsModal.value = true;
}

function closeTermsModal() {
  showTermsModal.value = false;
}

function openConfirmationModal() {
  showConfirmationModal.value = true;
}

function closeConfirmationModal() {
  showConfirmationModal.value = false;
}

function openRevocationModal() {
  showRevocationModal.value = true;
}

function closeRevocationModal() {
  showRevocationModal.value = false;
}

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

async function exportCSV() {
  const data = [
    ["Nome", "Sobrenome", "Contato"],
    [props.userInfo.first_name, props.userInfo.last_name, props.userInfo.contato],
  ];

  let csvContent = "data:text/csv;charset=utf-8," + data.map((e) => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "perfil_dados.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function deleteUser() {
  try {
    const authStore = useAuthStore();
    console.log(authStore.userInfo)
    await userApi.deleteUser(authStore.userInfo.cpf);
    toast.success("Conta deletada com sucesso!");
    router.push("/login");
  } catch {
    toast.error("Erro ao deletar usuário");
  }
  closeModal();
}

function closeModal() {
  emits("close");
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  color: black;
}

.modal-content {
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  position: relative;
  text-align: center;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.modal-title {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.modal-subtitle {
  font-size: 18px;
  margin-bottom: 20px;
  color: #666;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.user-info {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.label-title {
  font-size: 16px;
  color: #333;
}

.info-text {
  font-size: 16px;
  font-weight: bold;
  color: #555;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 25px;
}

.button-save,
.button-export,
.button-delete,
.button-revoke {
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  flex: 1;
  transition: background-color 0.3s ease;
}

.button-save {
  background-color: #4CAF50;
  color: white;
}

.button-export {
  background-color: #007BFF;
  color: white;
}

.button-delete {
  background-color: #f44336;
  color: white;
}

.button-revoke {
  background-color: #FFA500;
  color: white;
}

.button-save:hover {
  background-color: #45A049;
}

.button-export:hover {
  background-color: #0056b3;
}

.button-delete:hover {
  background-color: #e53935;
}

.button-revoke:hover {
  background-color: #ff9800;
}
</style>