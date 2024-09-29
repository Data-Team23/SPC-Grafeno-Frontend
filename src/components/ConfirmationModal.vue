<template>
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <label class="close-button" @click="closeModal">✖</label>
        <h1 class="modal-title">{{ title }}</h1>
        <p class="modal-message">{{ message }}</p>
        <div class="button-group">
          <Button textButton="Cancelar" @click="closeModal" class="button-cancel" />
          <Button textButton="Confirmar" @click="confirmAction" class="button-confirm" />
        </div>
      </div>
    </div>
</template>
  
<script setup>
import { defineProps, defineEmits } from "vue";
import Button from "@/components/Button/Button.vue";

const props = defineProps({
showModal: {
    type: Boolean,
    required: true,
},
title: {
    type: String,
    required: true,
},
message: {
    type: String,
    required: true,
},
action: {
    type: Function,
    required: true,
},
});

const emits = defineEmits(["close"]);

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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 40px;
  border-radius: 10px;
  width: 400px;
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

.modal-message {
  font-size: 18px;
  margin-bottom: 20px;
  color: #555;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.button-cancel,
.button-confirm {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  flex: 1;
  margin: 0 5px;
}

.button-cancel {
  background-color: #f44336;
}
</style>
