import { useAuthStore } from "@/store/auth";

export const guest = (to, from, next) => {
  const authStore = useAuthStore();
  if (authStore.user) {
    next({ name: 'Home' });
  } else {
    next();
  }
}
