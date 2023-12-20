<script setup>
import { useRoute, useRouter } from "vue-router";
import Logo from "@/assets/logo-light.svg";
import { ref } from "vue";
import { useAppStore } from "@/store/app.js";

const { params, query } = useRoute();
const router = useRouter();
const appStore =  useAppStore()

const form = ref({
    password: '',
    password_confirmation: '',
    token: params.token,
    email: query.email,
})

const formSubmitting = ref(false);

const errors = ref({});

const onSubmitResetPassword = async () => {
    formSubmitting.value = true;
    if (Object.keys(errors.value).length > 0) {
        errors.value = {};
    }
    axios.post('/api/auth/reset-password', form.value)
        .then(({ data }) => {
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
            formSubmitting.value = false;
        });
}

</script>

<template>
    <v-sheet class="h-100 d-flex justify-center align-center">
        <v-card class="w-33 d-flex align-center pa-10" elevation="5">
            <v-sheet class="w-100">
                <v-img :src="Logo" class="mb-10"/>
                <v-form @submit.prevent="onSubmitResetPassword">
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
                    <v-sheet class="mb-3">
                        <v-text-field
                            v-model="form.password_confirmation"
                            type="password"
                            label="Password confirmation"
                            prepend-inner-icon="mdi-lock"
                            variant="solo-filled">
                        </v-text-field>
                    </v-sheet>
                    <v-sheet class="mb-3">
                        <v-btn
                            type="submit"
                            color="primary"
                            :block="true"
                            :disabled="formSubmitting"
                            :loading="formSubmitting">
                            Reset password
                        </v-btn>
                    </v-sheet>
                </v-form>
            </v-sheet>
        </v-card>
    </v-sheet>
</template>

<style scoped>

</style>
