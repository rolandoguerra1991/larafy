<script setup>
import { useRoute } from "vue-router";
import Logo from "@/assets/logo-light.svg";
import { ref } from "vue";

const { params } = useRoute();

const form = ref({
    password: '',
    password_confirmation: '',
    token: params.token,
})

</script>

<template>
    <v-sheet class="h-100 d-flex justify-center align-center">
        <v-card class="w-33 d-flex align-center pa-10" elevation="5">
            <v-sheet class="w-100">
                <v-img :src="Logo" class="mb-10"/>
                <v-form >
                    <v-sheet class="mb-3">
                        <v-text-field
                            :model-value="params.email"
                            :disabled="true"
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
                        <v-btn type="submit" color="primary" :block="true">
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
