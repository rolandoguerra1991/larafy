<template>
    <router-view />
    <v-snackbar
        v-model="appStore.snackBar.open"
        :color="appStore.snackBar.color"
        location="top right"
        timeout="4000"
        position="sticky"
    >
        {{ appStore.snackBar.text }}
        <template v-slot:actions>
            <v-btn
                variant="text"
                @click="appStore.closeSnackBar()"
                icon="mdi-close"
            />
        </template>
    </v-snackbar>
</template>

<script setup>
import { useAppStore } from "@/store/app.js";

const appStore = useAppStore()
</script>
