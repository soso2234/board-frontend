<template>
  <NavBar v-if="authStore.isLoggedIn" />
  <RouterView />
  <ChatPopup v-if="authStore.isLoggedIn" />
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import ChatPopup from '@/components/ChatPopup.vue'
import { useAuthStore } from '@/stores/auth.js'

const authStore = useAuthStore()
</script>