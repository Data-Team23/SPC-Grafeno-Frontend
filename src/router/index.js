import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/auth";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Perfil from "../views/Perfil.vue";
import Register from "../views/Register.vue";
import Users from '../views/Users.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { 
      requiresAuth: true 
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/perfil",
    name: "Perfil",
    component: Perfil,
    meta: { 
      requiresAuth: true 
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: { 
      requiresAuth: true 
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  authStore.checkAuth();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
