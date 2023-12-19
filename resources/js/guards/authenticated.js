import { useAuthStore } from "@/store/auth";

export const authenticated = async (to, from, next) => {
  const authStore = useAuthStore();
  await axios.get('/api/user')
    .then(({ data }) => {
      authStore.setUser(data);
      next();
    }).catch(({ response }) => {
      if (response.status === 401) {
        authStore.setUser(null);
        next({ name: 'Login' });
      }
    })
}
