<script setup>
import Logo from "@/assets/logo-light.svg";
import Bg from "@/assets/login-bg.jpg";
import {onMounted, ref} from "vue";

onMounted(async () => {
    await axios.get('/sanctum/csrf-cookie');
})

const form = ref({
    remember: false,
    email: '',
    password: '',
})


const onSubmitHandler = async () => {
    await axios.post('/api/auth/login', form.value)
        .then(({ data }) => {
            console.log(data);
        }).catch(({ response }) => {
            console.log(response);
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
                            label="Email"
                            prepend-inner-icon="mdi-email"
                            variant="solo-filled">
                        </v-text-field>
                    </v-sheet>
                    <v-sheet class="mb-3">
                        <v-text-field
                            v-model="form.password"
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
                        <v-btn type="submit" color="primary" block>
                            Sign in
                        </v-btn>
                    </v-sheet>
                    <v-sheet class="mb-3">
                        <p>
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
