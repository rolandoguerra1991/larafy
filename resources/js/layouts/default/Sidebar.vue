<template>
<v-navigation-drawer :model-value="appStore.sidebarOpen">
    <v-list nav>
        <v-list-item subtitle="Main Menu" />
        <v-list-item
            link
            title="Home"
            prepend-icon="mdi-home"
            to="/"
        />
    </v-list>
</v-navigation-drawer>
</template>

<script setup>
import { useAppStore } from "../../store/app";
const appStore = useAppStore();

</script>
