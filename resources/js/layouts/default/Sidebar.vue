<template>
<v-navigation-drawer :model-value="appStore.sidebarOpen">
    <v-sheet height="64px" class="pa-2" border>
        <v-img :src="VuetifyLogo"></v-img>
    </v-sheet>
    <v-list nav>
        <v-list-item subtitle="Main Menu" />
        <v-list-item
            link
            color="primary"
            title="Home"
            prepend-icon="mdi-home"
            to="/"
        />
    </v-list>
</v-navigation-drawer>
</template>

<script setup>
import { useAppStore } from "../../store/app";
import VuetifyLogo from "../../assets/logo-light.svg"

const appStore = useAppStore();

</script>
