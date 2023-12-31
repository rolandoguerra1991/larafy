import { computed, onMounted, onUnmounted, ref } from "vue";
import axios from "axios";
import { useAppStore } from "@/store/app.js";
import { useAuthStore } from "@/store/auth";
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";

export const useAuth = () => {
  const appStore = useAppStore()
  const authStore = useAuthStore();
  const { user } = storeToRefs(useAuthStore());
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

  const initialRegisterForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  onMounted(async () => {
    await axios.get('/sanctum/csrf-cookie');
  });

  const submittingForm = ref(false);
  const errors = ref({});
  const forgotPasswordForm = ref(initialForgotPasswordForm);
  const loginForm = ref(initialLoginForm);
  const resetPasswordForm = ref(initalResetPasswordForm);
  const registerForm = ref(initialRegisterForm);

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
        if (response.data.errors && Object.keys(response.data.errors).length > 0) {
          Object.keys(response.data.errors).forEach((error) => {
            errors.value[error] = response.data.errors[error].at(0);
          })
        } else if(response.data.message) {
          errors.value.email = response.data.message;
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
        if (response.data.errors && Object.keys(response.data.errors).length > 0) {
          Object.keys(response.data.errors).forEach((error) => {
            errors.value[error] = response.data.errors[error].at(0);
          })
        } else if(response.data.email) {
          errors.value.email = response.data.email;
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

  const onSubmitRegisterHandler = async () => {
    submittingForm.value = true;
    if (Object.keys(errors.value).length > 0) {
      errors.value = {};
    }
    axios.post('/api/auth/register', registerForm.value)
      .then(({ data }) => {
        appStore.dispatchSnackBar({
          text: data.message,
          color: 'success'
        });
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

  const clearForms = () => {
    loginForm.value = initialLoginForm;
    forgotPasswordForm.value = initialForgotPasswordForm;
    resetPasswordForm.value = initalResetPasswordForm;
    registerForm.value = initialRegisterForm;
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

  const userAvatarInitials = computed(() => {
    const spliter = user.value.name.split(' ');
    return spliter.length > 1 ? `${spliter[0][0]}${spliter[1][0]}` : spliter[0][0];
  });

  return {
    submittingForm,
    errors,
    forgotPasswordForm,
    loginForm,
    resetPasswordForm,
    registerForm,
    user,
    userAvatarInitials,
    onSubmitLoginHandler,
    onSubmitForgotPasswordHandler,
    onSubmitResetPasswordHandler,
    onLogoutHandler,
    onSubmitRegisterHandler,
  }
}
