<template>
  <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <label class="close-button" @click="closeModal">✖</label>
      <h1 class="modal-title">Revogação de Consentimento</h1>
      <p class="modal-message">Você está prestes a revogar o consentimento para o uso de seus dados pessoais. Isso resultará na exclusão de sua conta e de todas as suas informações associadas.</p>
      <p class="modal-warning">Tem certeza de que deseja prosseguir?</p>
      <div class="button-group">
        <Button textButton="Cancelar" @click="closeModal" class="button-cancel" />
        <Button textButton="Revogar Consentimento" @click="confirmAction" class="button-confirm" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import Button from "@/components/Button/Button.vue";
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import { toast } from "vue3-toastify";
import { userApi } from "@/services/api";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
  userInfo: {
    type: Object,
    required: true,
  },
  action: {
    type: Function,
    required: true,
  },
});

const emits = defineEmits(["close"]);
const showConfirmationModal = ref(false);

function closeConfirmationModal() {
  showConfirmationModal.value = false;
}

function confirmAction() {
  props.action();
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
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* Fundo com transparência */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 480px; /* Aumentei a largura da modal */
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3); /* Sombra mais definida */
  position: relative;
  text-align: center;
  max-width: 90%; /* Responsivo para telas menores */
}

.close-button {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #555;
  transition: color 0.3s ease;
}

.close-button:hover {
  color: #f44336; /* Cor de destaque ao passar o mouse */
}

.modal-title {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.modal-message {
  font-size: 16px;
  color: #555;
  line-height: 1.6; /* Melhora a legibilidade */
  margin-bottom: 15px;
}

.modal-warning {
  font-size: 15px;
  color: #d9534f;
  font-weight: 600;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  justify-content: flex-end; /* Alinha os botões à direita */
  gap: 12px; /* Espaço entre os botões */
  margin-top: 25px;
}

.button-cancel {
  background-color: #888;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  transition: background-color 0.3s ease;
}

.button-cancel:hover {
  background-color: #666; /* Cor ao passar o mouse */
}

.button-confirm {
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  transition: background-color 0.3s ease;
}

.button-confirm:hover {
  background-color: #d32f2f; /* Cor ao passar o mouse */
}

/* Tornando a modal mais responsiva */
@media (max-width: 600px) {
  .modal-content {
    width: 95%;
    padding: 20px;
  }

  .modal-title {
    font-size: 22px;
  }

  .modal-message,
  .modal-warning {
    font-size: 14px;
  }

  .button-cancel,
  .button-confirm {
    padding: 8px 16px;
    font-size: 14px;
  }
}

</style>
