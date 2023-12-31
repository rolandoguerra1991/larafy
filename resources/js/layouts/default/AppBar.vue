<script setup>
import { useAuth } from "@/composables/auth"
import { useAppStore } from "@/store/app";
const { onLogoutHandler, user, userAvatarInitials } = useAuth();
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
                    <v-menu
                        :location="'bottom start'"
                        :width="'300'"
                        :max-width="'300'"
                    >
                        <template #activator="{ props }">
                            <v-btn v-bind="props" icon="mdi-bell-outline"></v-btn>
                        </template>
                        <v-sheet>
                            <v-sheet class="d-flex justify-space-between align-center px-3 py-1" color="primary">
                                <span>Notifications</span>
                                <v-btn icon="mdi-cog" variant="plain"/>
                            </v-sheet>
                            <v-divider />
                            <v-sheet class="overflow-y-auto" style="max-height: 300px; height: 300px;">

                            </v-sheet>
                        </v-sheet>
                    </v-menu>
                </v-col>
                <v-col cols="auto">
                    <v-menu
                        :location="'bottom start'"
                        :width="'200px'"
                    >
                        <template #activator="{ props }">
                            <v-avatar
                                class="cursor-pointer"
                                v-bind="props"
                                :text="userAvatarInitials"
                                :color="'primary'"
                            />
                        </template>
                        <v-sheet>
                            <v-sheet class="d-flex justify-center align-center px-3 py-3" color="primary">
                                <span class="font-bold">{{ user.name }}</span>
                            </v-sheet>
                            <v-divider />
                            <v-sheet>
                                <v-list density="compact">
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
                                            <v-icon icon="mdi-logout" />
                                        </template>
                                    </v-list-item>
                                </v-list>
                            </v-sheet>
                        </v-sheet>
                    </v-menu>
                </v-col>
            </v-row>
        </v-container>
    </template>
  </v-app-bar>
</template>
