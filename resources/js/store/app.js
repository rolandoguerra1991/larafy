// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  const sidebarOpen = ref(true);
  const authSnackBar = ref({
    open: false,
    text: '',
    type: ''
  });

  const toggleSidebar = () => sidebarOpen.value = !sidebarOpen.value;

  const openAuthSnackBar = (text, type) => {
    authSnackBar.value.open = true;
    authSnackBar.value.text = text;
    authSnackBar.value.type = type;
  }

  const closeAuthSnackBar = () => {
    authSnackBar.value.open = false;
    authSnackBar.value.text = '';
    authSnackBar.value.type = '';
  }

  return {
    sidebarOpen,
    authSnackBar,
    toggleSidebar,
    openAuthSnackBar,
    closeAuthSnackBar,
  }
});
