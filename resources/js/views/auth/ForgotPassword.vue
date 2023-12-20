<script setup>
import Logo from "@/assets/logo-light.svg";
import { ref } from "vue";
import {useAppStore} from "@/store/app.js";

const appStore =  useAppStore()

const form = ref({
    email: ''
});

const submittingForm = ref(false);

const errors = ref({});

const onSubmit = async () => {
    if (Object.keys(errors.value).length > 0) {
        errors.value = {};
    }

    submittingForm.value = true;
    await axios.post('/api/auth/forgot-password', form.value)
        .then(({ data }) => {
            appStore.dispatchSnackBar({
                text: data.status,
                color: 'success'
            });
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
            submittingForm.value = false;
        });
}
</script>

<template>
    <v-sheet class="h-100 d-flex justify-center align-center">
        <v-card class="w-25 d-flex align-center pa-10" elevation="5">
            <v-sheet class="w-100">
                <v-img :src="Logo" class="mb-10"/>
                <v-form @submit.prevent="onSubmit">
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
                        <v-btn type="submit" color="primary" :block="true" :disabled="submittingForm" :loading="submittingForm">
                            Send link by Email
                        </v-btn>
                    </v-sheet>
                    <v-sheet class="mb-3">
                        <p class="text-center">
                            Back to
                            <router-link
                                to="/auth/login"
                                class="text-decoration-none">
                                login
                            </router-link>
                        </p>
                    </v-sheet>
                </v-form>
            </v-sheet>
        </v-card>
    </v-sheet>
</template>

<style scoped>

</style>
