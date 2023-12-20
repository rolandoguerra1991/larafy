// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  const sidebarOpen = ref(true);
  const snackBar = ref({
    color: '',
    text: '',
    open: false,
  })
  const toggleSidebar = () => sidebarOpen.value = !sidebarOpen.value;
  const dispatchSnackBar = ({ text, color }) => {
    snackBar.value = {
      open: true,
      text,
      color,
    }
  }

  const closeSnackBar = () => {
    snackBar.value = {
      open: false,
      text: '',
      color: '',
    }
  }

  return {
    sidebarOpen,
    toggleSidebar,
    snackBar,
    dispatchSnackBar,
    closeSnackBar,
  }
});
