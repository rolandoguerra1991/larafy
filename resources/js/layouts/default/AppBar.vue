<script setup>
import { useAuth } from "@/composables/auth"
import { useAppStore } from "@/store/app";
const { onLogoutHandler, user } = useAuth();
const appStore = useAppStore();
</script>

<template>
  <v-app-bar>
    <template #prepend>
        <v-app-bar-nav-icon @click="appStore.toggleSidebar()"></v-app-bar-nav-icon>
    </template>
    <template #append>
        <v-container>
            <v-row align="center" justify="center">
                <v-col cols="auto">
                    <v-menu>
                        <template #activator="{ props }">
                            <v-btn v-bind="props" icon="mdi-bell-outline"></v-btn>
                        </template>
                    </v-menu>
                </v-col>
                <v-col cols="auto">
                    <v-menu>
                        <template #activator="{ props }">
                            <v-avatar
                                class="cursor-pointer"
                                v-bind="props"
                                image="https://cdn.vuetifyjs.com/images/john-smirk.png"
                            />
                        </template>
                        <v-list>
                            <v-list-item
                                link
                                title="My profile"
                                prepend-icon="mdi-account-circle"
                                to="/profile"
                            />
                            <v-divider />
                            <v-list-item
                                link
                                title="Logout"
                                @click="onLogoutHandler"
                            >
                                <template #prepend>
                                    <v-icon color="red" icon="mdi-logout" />
                                </template>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
        </v-container>
    </template>
  </v-app-bar>
</template>
