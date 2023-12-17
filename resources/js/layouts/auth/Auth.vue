<script setup>
import { useAppStore } from "@/store/app.js";

const appStore = useAppStore();
</script>

<template>
 <v-app class="bg-grey-lighten-3">
     <v-main>
         <router-view />
     </v-main>
     <v-snackbar
         v-model="appStore.authSnackBar.open"
         :color="appStore.authSnackBar.type"
     >
         {{ appStore.authSnackBar.text }}
     </v-snackbar>
 </v-app>
</template>

<style scoped>

</style>
