import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);

  const setUser = (payload) => {
    user.value = payload;
  }

  return {
    user,
    setUser,
  }
},
{
  persist: true,
});
