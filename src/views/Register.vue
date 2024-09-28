<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-text">
                <figure>
                    <img src="/src/assets/nav-logo.png" alt="">
                </figure>
                <h1>Bem-vindo de volta</h1>
                <h3>Acesse sua conta agora mesmo.</h3>
            </div>
            <router-link to="/login">
                <Button textButton="ENTRAR"></Button>
            </router-link>
            <div class="lgpd">
                Nosso sistema está em conformidade com a Lei Geral de Proteção de Dados (LGPD).
            </div>
        </div>
        <div class="login-form">
            <h1>Crie sua conta</h1>
            <h3>Preencha seus dados</h3>
            <form @submit.prevent="register">
                <Input placeholder="Nome completo" icon="fa-solid fa-user" v-model="name" />
                <Input placeholder="CPF" icon="fa-solid fa-id-card" v-model="cpf" mask="###.###.###-##" />
                <Input placeholder="Email" v-model="email" />
                <Input placeholder="Contato" icon="fa-solid fa-phone" v-model="contact" :mask="'(##) #####-####'" />
                <Input placeholder="Senha" icon="fa-solid fa-lock" type="password" v-model="password" />
                <Input placeholder="Confirmação senha" icon="fa-solid fa-lock" type="password" v-model="confirmPassword" />
                
                <div class="terms-checkbox">
                    <input type="checkbox" v-model="acceptedTerms" id="terms" class="styled-checkbox"/>
                    <label class="terms-label" for="terms"> Li e aceito os termos de uso e a política de privacidade. <span @click="openModal" class="link">Leia aqui</span></label>
                </div>
                
                <Button textButton="CADASTRAR"></Button>
            </form>
            <Footer></Footer>
        </div>
        <div v-if="showModal" class="modal-overlay">
            <div class="modal">
                <button @click="closeModal" class="close-button custom-close">X</button>
                <h2>Termos de Uso e Política de Privacidade</h2>
                <p>
                    Ao criar uma conta, você concorda com os seguintes termos: 
                    Seus dados serão utilizados exclusivamente para fins de cadastro e 
                    aprimoramento de nossos serviços, respeitando a Lei Geral de Proteção de Dados (LGPD).
                    Você tem o direito de acessar, corrigir e excluir seus dados a qualquer momento.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import Input from '../components/Input/Input.vue';
import Button from '../components/Button/Button.vue';
import Footer from '../components/Footer/Footer.vue';
import "../assets/styles.css";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from "vue3-toastify";
import { userApi } from "@/services/api";

const name = ref('');
const cpf = ref('');
const email = ref('');
const contact = ref('');
const password = ref('');
const confirmPassword = ref('');
const acceptedTerms = ref(false);
const showModal = ref(false);
const router = useRouter();

function isEmailValid(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

async function register() {
    if (!acceptedTerms.value) {
        toast.error("Você deve aceitar os termos de uso.");
        return;
    }

    if (!isEmailValid(email.value)) {
        toast.error("Por favor, insira um e-mail válido.");
        return;
    }

    if (password.value !== confirmPassword.value) {
        toast.error("As senhas não coincidem. Tente novamente.");
        return;
    }

    const nameParts = name.value.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];

    const data = {
        first_name: firstName,
        last_name: lastName,
        cpf: cpf.value.replace(/\D/g, ''),
        email: email.value,
        contact: contact.value.replace(/\D/g, ''),
        password: password.value
    };

    try {
        const response = await userApi.createUser(data);
        if (response.status === 201) {
            toast.success("Cadastro bem-sucedido!");
            router.push("/");
        } else {
            toast.error("Falha no cadastro");
        }
    } catch (error) {
        toast.error("Erro ao realizar o cadastro.");
    }
}

function openModal() {
    showModal.value = true;
}

function closeModal() {
    showModal.value = false;
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
}

.modal {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 90%;
    max-width: 500px;
    position: relative;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
}

.terms-checkbox {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
}

.styled-checkbox {
    display: none;
}

.styled-checkbox + label {
    position: relative;
    padding-left: 30px;
    cursor: pointer;
}

.styled-checkbox + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    border: 2px solid #333;
    border-radius: 3px;
    background: white;
}

.styled-checkbox:checked + label:before {
    background: #007bff; 
    border-color: #007bff;
}

.terms-label {
    color: black;
}

.link {
    color: blue;
    cursor: pointer;
    text-decoration: underline;
}

.login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.custom-close {
    all: unset;
    cursor: pointer;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: black;
}
</style>
