import { onMounted, onUnmounted, ref } from "vue";
import axios from "axios";
import { useAppStore } from "@/store/app.js";
import { useAuthStore } from "@/store/auth";
import { useRouter, useRoute } from "vue-router";

export const useAuth = () => {
  const appStore = useAppStore()
  const authStore = useAuthStore();
  const router = useRouter();
  const { params, query } = useRoute();

  const initialLoginForm = {
    remember: false,
    email: '',
    password: '',
  };

  const initialForgotPasswordForm = {
    email: ''
  };

  const initalResetPasswordForm = {
    password: '',
    password_confirmation: '',
    token: params.token,
    email: query.email,
  };

  onMounted(async () => {
    await axios.get('/sanctum/csrf-cookie');
  });

  const submittingForm = ref(false);
  const errors = ref({});
  const forgotPasswordForm = ref(initialForgotPasswordForm);
  const loginForm = ref(initialLoginForm);
  const resetPasswordForm = ref(initalResetPasswordForm);

  const onSubmitLoginHandler = async () => {
    submittingForm.value = true;
    if (Object.keys(errors.value).length > 0) {
      errors.value = {};
    }
    await axios.post('/api/auth/login', loginForm.value)
      .then(({ data }) => {
        authStore.setUser(data);
        router.push({ name: 'Home' });
      }).catch(({ response }) => {
        if (Object.keys(response.data.errors).length > 0) {
          Object.keys(response.data.errors).forEach((error) => {
            errors.value[error] = response.data.errors[error].at(0);
          })
        }
      }).finally(() => {
        submittingForm.value = false;
      });
  }

  const onSubmitForgotPasswordHandler = async () => {
    if (Object.keys(errors.value).length > 0) {
      errors.value = {};
    }

    submittingForm.value = true;
    await axios.post('/api/auth/forgot-password', forgotPasswordForm.value)
      .then(({ data }) => {
        appStore.dispatchSnackBar({
          text: data.status,
          color: 'success'
        });
      }).catch(({ response }) => {
        if (Object.keys(response.data.errors).length > 0) {
          Object.keys(response.data.errors).forEach((error) => {
            errors.value[error] = response.data.errors[error].at(0);
          })
        }
      }).finally(() => {
        submittingForm.value = false;
      });
  }

  const onSubmitResetPasswordHandler = async () => {
    submittingForm.value = true;
    if (Object.keys(errors.value).length > 0) {
      errors.value = {};
    }
    axios.post('/api/auth/reset-password', resetPasswordForm.value)
      .then(({ data }) => {
        appStore.dispatchSnackBar({
          text: data.status,
          color: 'success'
        });
        router.push({ name: 'Home' });
      }).catch(({ response }) => {
        appStore.dispatchSnackBar({
          text: response.data.message,
          color: 'red'
        });
        if (Object.keys(response.data.errors).length > 0) {
          Object.keys(response.data.errors).forEach((error) => {
            errors.value[error] = response.data.errors[error].at(0);
          })
        }
      }).finally(() => {
        submittingForm.value = false;
      });
  }

  const clearForms = () => {
    loginForm.value = initialLoginForm;
    forgotPasswordForm.value = initialForgotPasswordForm;
    resetPasswordForm.value = initalResetPasswordForm
  }

  const onLogoutHandler = async () => {
    await axios.get('/api/auth/logout')
      .then(() => {
        authStore.setUser(null);
        router.push({ name: 'Login' });
      }).catch(({ response }) => {
        console.log(response);
      })
  }

  onUnmounted(() => {
    clearForms();
  })

  return {
    submittingForm,
    errors,
    forgotPasswordForm,
    loginForm,
    resetPasswordForm,
    onSubmitLoginHandler,
    onSubmitForgotPasswordHandler,
    onSubmitResetPasswordHandler,
    onLogoutHandler,
  }
}
