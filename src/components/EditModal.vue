<template>
    <div v-if="showModal" class="modal">
        <div class="modal-content">
            <span class="close" @click="$emit('close')">&times;</span>
            <h2>Editar Dados</h2>
            <div class="form-group">
                <div class="form-item" v-for="(value, key) in formData" :key="key">
                    <label :for="key">{{ columnNames[key] || key }}</label>
                    <input
                        v-if="key === 'is_admin'"
                        v-model="formData[key]"
                        type="checkbox"
                        :id="key"
                    />
                    <div class="form-key" v-else>
                        {{ formData[key] }}
                    </div>
                </div>
            </div>
            <div class="button-group">
                <button @click="saveChanges" class="save-button">Salvar</button>
                <button @click="$emit('close')" class="cancel-button">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
    showModal: Boolean,
    rowData: Object,
});

const columnNames = {
    id: "Identificador",
    first_name: "Primeiro nome",
    last_name: "Último nome",
    email: "E-mail",
    cpf: "Cpf",
    contato: "Contato",
    created_at: "Criado em:",
    updated_at: "Atualizado em:",
    is_admin: "Administrador",
};

const emit = defineEmits(["save", "close"]);
const formData = ref({ ...props.rowData });

const saveChanges = () => {
    emit("save", formData.value);
};
</script>

<style scoped>
.modal {
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
    background-color: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    position: relative;
    width: 100%;
    max-width: 400px;
    animation: slideIn 0.4s ease-in-out;
}

h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: #444;
    text-align: center;
    font-family: 'Roboto', sans-serif;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: space-between;
}

.form-key {
    width: 100%;
    border: 1px solid hsl(0, 0%, 17%);
    border-radius: 5px;
}

.form-item {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 45%;
    color: black;
    align-items: flex-start;
}

label {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 5px;
    font-family: 'Roboto', sans-serif;
}

input[type="text"], input[type="checkbox"] {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    transition: border-color 0.3s ease;
    font-family: 'Roboto', sans-serif;
    width: 100%; /* Garantindo que o input ocupe toda a largura */
}

input[type="text"]:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 10px rgba(0, 123, 255, 0.2);
}

input[type="checkbox"] {
    width: auto;
    margin-top: 5px;
}

.button-group {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
}

button {
    padding: 12px 25px;
    font-size: 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-family: 'Roboto', sans-serif;
}

.save-button {
    background-color: #28a745;
    color: white;
}

.save-button:hover {
    background-color: #218838;
}

.cancel-button {
    background-color: #dc3545;
    color: white;
}

.cancel-button:hover {
    background-color: #c82333;
}

.close {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 1.8rem;
    font-weight: bold;
    color: #666;
    cursor: pointer;
    transition: color 0.3s ease;
}

.close:hover {
    color: #000;
}
</style>
