<template>
  <NavBar v-if="authStore.isLoggedIn" />
  <RouterView />
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import { useAuthStore } from '@/stores/auth.js'

const authStore = useAuthStore()
</script>