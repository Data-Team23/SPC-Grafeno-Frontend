import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Perfil from '../views/Perfil.vue';
import Register from '../views/Register.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/perfil',
        name: 'Perfil',
        component: Perfil
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;