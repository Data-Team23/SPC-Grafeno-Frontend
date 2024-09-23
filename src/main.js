import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "vue-toastification/dist/index.css";
import "./style.css";

import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const app = createApp(App);

app.use(createPinia());

app.use(Vue3Toastify, { 
  autoClose: 1000, 
  position: "bottom-center",
  closeButton: false
});
app.use(router);
app.mount("#app");
