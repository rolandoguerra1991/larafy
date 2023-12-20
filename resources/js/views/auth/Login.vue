<script setup>
import Logo from "@/assets/logo-light.svg";
import Bg from "@/assets/login-bg.jpg";
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";
import {useAppStore} from "@/store/app.js";

const authStore = useAuthStore();
const router = useRouter();
const appStore  = useAppStore();

onMounted(async () => {
    await axios.get('/sanctum/csrf-cookie');
})

const form = ref({
    remember: false,
    email: '',
    password: '',
})

const errors = ref({});

const loadingForm = ref(false);


const onSubmitHandler = async () => {
    loadingForm.value = true;
    if (Object.keys(errors.value).length > 0) {
        errors.value = {};
    }
    await axios.post('/api/auth/login', form.value)
        .then(({ data }) => {
            authStore.setUser(data);
            appStore.dispatchSnackBar({
                text: data.status,
                color: 'success'
            });
            router.push({ name: 'Home' });
        }).catch(({ response }) => {
            appStore.dispatchSnackBar({
                text: response.data.message,
                color: 'danger'
            });
            if (Object.keys(response.data.errors).length > 0) {
                Object.keys(response.data.errors).forEach((error) => {
                    errors.value[error] = response.data.errors[error].at(0);
                })
            }
        }).finally(() => {
            loadingForm.value = false;
        });
}
</script>

<template>
    <v-sheet class="h-100 d-flex">
        <v-card class="w-33 d-flex align-center pa-10" elevation="5">
            <v-sheet class="w-100">
                <v-img :src="Logo" class="mb-10"/>
                <v-form @submit.prevent="onSubmitHandler">
                    <v-sheet class="mb-3">
                        <v-text-field
                            v-model="form.email"
                            :error="errors.email && errors.email.length > 0"
                            :error-messages="errors.email"
                            label="Email"
                            prepend-inner-icon="mdi-email"
                            variant="solo-filled">
                        </v-text-field>
                    </v-sheet>
                    <v-sheet class="mb-3">
                        <v-text-field
                            v-model="form.password"
                            :error="errors.password && errors.password.length > 0"
                            :error-messages="errors.password"
                            type="password"
                            label="Password"
                            prepend-inner-icon="mdi-lock"
                            variant="solo-filled">
                        </v-text-field>
                    </v-sheet>
                    <v-sheet class="mb-3 d-flex justify-space-between align-center">
                        <v-checkbox
                            v-model="form.remember"
                            label="Remember me?"
                            color="primary"
                            hide-details
                        ></v-checkbox>
                        <router-link
                            to="/auth/forgot-password"
                            class="text-decoration-none">
                            Forgot your password?
                        </router-link>
                    </v-sheet>
                    <v-sheet class="mb-3">
                        <v-btn
                            type="submit"
                            color="primary"
                            :block="true"
                            :loading="loadingForm"
                            :disabled="loadingForm">
                            Sign in
                        </v-btn>
                    </v-sheet>
                    <v-sheet class="mb-3">
                        <p class="text-center">
                            Do you haven not a account? click
                            <router-link
                                to="/auth/register"
                                class="text-decoration-none">
                                here
                            </router-link>
                        </p>
                    </v-sheet>
                </v-form>
            </v-sheet>
        </v-card>
        <v-sheet class="flex-grow-1 h-screen overflow-hidden">
            <v-img :src="Bg" :cover="true" :aspect-ratio="1" />
        </v-sheet>
    </v-sheet>
</template>

<style scoped>

</style>
