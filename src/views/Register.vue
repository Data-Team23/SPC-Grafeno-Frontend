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
                    <label class="terms-label" for="terms"> Li e aceito os termos de uso e a política de privacidade.</label>
                    <span @click="openModal" class="link">Leia aqui</span>
                </div>
                <Button textButton="CADASTRAR"></Button>
            </form>
            <Footer></Footer>
        </div>

        <div v-if="showCodeModal" class="modal-overlay">
            <div class="modal">
                <h2>Inserir Código de Verificação</h2>
                <Input placeholder="Código" v-model="verificationCode" />
                <div class="modal-buttons">
                    <button @click="verifyCode" class="accept-button">Verificar</button>
                    <button @click="closeCodeModal" class="reject-button">Cancelar</button>
                </div>
            </div>
        </div>

        <div v-if="showModal" class="modal-overlay">
            <div class="modal">
                <h2>Termos de Uso e Política de Privacidade</h2>
                <p>
                    Ao criar uma conta em nossa plataforma, você concorda com os seguintes termos e condições:
                    <br><br>
                    1. <strong>Uso de Dados Pessoais</strong>: Seus dados pessoais, como nome, CPF, e-mail e número de contato, serão coletados e utilizados exclusivamente para fins de registro e para melhorar a experiência do usuário em nossa plataforma. 
                    <br><br>
                    2. <strong>Finalidade do Tratamento dos Dados</strong>: Os dados coletados podem ser utilizados para:
                    <span class="reduced-line-spacing">
                        <br>
                        - Comunicação sobre novidades, atualizações e ofertas;
                        <br>
                        - Personalização de conteúdos e anúncios;
                        <br>
                        - Melhoria de nossos serviços com base em suas preferências;
                        <br>
                        - Atendimento ao cliente e suporte.
                    </span>
                    <br><br>
                    3. <strong>Direitos do Usuário</strong>: Você tem o direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento. Para isso, entre em contato conosco através dos canais disponibilizados em nossa plataforma.
                    <br><br>
                    4. <strong>Cookies e Tecnologias Similares</strong>: Utilizamos cookies e tecnologias semelhantes para garantir a melhor experiência em nosso site. Você pode gerenciar suas preferências de cookies nas configurações do seu navegador.
                    <br><br>
                    5. <strong>Revogação do Consentimento</strong>: Você pode revogar seu consentimento a qualquer momento. Entretanto, é importante observar que, ao revogar o consentimento, sua conta será excluída, e você perderá acesso a todos os dados e serviços associados.
                    <br><br>
                    6. <strong>Modificações nos Termos</strong>: Reservamo-nos o direito de modificar estes termos a qualquer momento. Quaisquer alterações serão informadas através de um aviso em nossa plataforma, e a continuidade do uso dos nossos serviços será considerada como aceitação dos novos termos.
                    <br><br>
                    Ao clicar em "Aceitar", você concorda com todos os termos acima. Se não concordar, você não poderá criar uma conta em nossa plataforma.
                </p>
                <div class="modal-buttons">
                    <button @click="acceptTerms" class="accept-button">Aceitar</button>
                    <button @click="closeModal" class="reject-button">Recusar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Input from "@/components/Input/Input.vue";
import Button from "@/components/Button/Button.vue";
import Footer from "@/components/Footer/Footer.vue";
import "../assets/styles.css";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { userApi } from "@/services/api";

const name = ref("");
const cpf = ref("");
const email = ref("");
const contact = ref("");
const password = ref("");
const confirmPassword = ref("");
const acceptedTerms = ref(false);
const showModal = ref(false);
const showCodeModal = ref(false);
const verificationCode = ref("");
const router = useRouter();
const member_id = ref("");

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

    const nameParts = name.value.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];

    const data = {
        first_name: firstName,
        last_name: lastName,
        cpf: cpf.value.replace(/\D/g, ""),
        email: email.value,
        contato: contact.value.replace(/\D/g, ""),
        password: password.value
    };

    try {
        const response = await userApi.createUser(data);
        if (response.status === 200) {
            toast.success("Cadastro bem-sucedido! Um código de verificação foi enviado para seu e-mail.");
            member_id.value = response.data.member_id
            showCodeModal.value = true;
        } else {
            toast.error("Falha no cadastro");
        }
    } catch (error) {
        toast.error("Erro ao realizar o cadastro.");
    }
}

async function verifyCode() {
    try {
        const data = {
            member_id: member_id.value,
            otp_code: verificationCode.value,
        };
        const response = await userApi.verifyCode(data);
        if (response.status === 201) {
            toast.success("Código verificado com sucesso!");
            router.push("/");
        } else {
            toast.error("Código inválido. Tente novamente.");
        }
    } catch (error) {
        toast.error("Erro ao verificar o código.");
    }
}

function openModal() {
    showModal.value = true;
}

function closeModal() {
    showModal.value = false;
}

function openCodeModal() {
    showCodeModal.value = true;
}

function closeCodeModal() {
    showCodeModal.value = false;
}

function acceptTerms() {
    acceptedTerms.value = true;
    closeModal();
}

function rejectTerms() {
    toast.error("Você precisa aceitar os termos para continuar.");
    closeModal();
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
    padding: 30px;
    border-radius: 8px;
    width: 90%;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.close-button {
    position: absolute;
    top: 15px;
    right: 15px;
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
}
</style>
