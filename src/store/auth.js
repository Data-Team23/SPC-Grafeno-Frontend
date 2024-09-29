import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: null,
    refreshToken: null,
    userInfo: null,
  }),
  
  actions: {
    login(access, refresh) {
      this.accessToken = access;
      this.refreshToken = refresh;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      this.userInfo = jwtDecode(access);
    },
    logout() {
      this.accessToken = null;
      this.refreshToken = null;
      this.userInfo = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    checkAuth() {
      this.accessToken = localStorage.getItem("accessToken");
      this.refreshToken = localStorage.getItem("refreshToken");

      if (this.accessToken) {
        this.userInfo = jwtDecode(this.accessToken);
      } else {
        this.userInfo = null;
      }
    },
  },
  
  getters: {
    isAuthenticated: (state) => !!state.accessToken && !!state.refreshToken,
    getUserInfo: (state) => state.userInfo,
  }
});
