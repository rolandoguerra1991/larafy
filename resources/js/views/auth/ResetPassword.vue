<script setup>
import Logo from "@/assets/logo-light.svg";
import { useAuth } from "@/composables/auth"
const { errors, onSubmitResetPasswordHandler, submittingForm, resetPasswordForm } = useAuth();

</script>

<template>
    <v-sheet class="h-100 d-flex justify-center align-center">
        <v-card class="w-33 d-flex align-center pa-10" elevation="5">
            <v-sheet class="w-100">
                <v-img :src="Logo" class="mb-10"/>
                <v-form @submit.prevent="onSubmitResetPasswordHandler">
                    <v-sheet class="mb-3">
                        <v-text-field
                            v-model="resetPasswordForm.password"
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
                            v-model="resetPasswordForm.password_confirmation"
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
                            :disabled="submittingForm"
                            :loading="submittingForm">
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
