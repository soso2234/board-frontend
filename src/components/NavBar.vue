<template>
  <nav class="navbar">
    <div class="navbar-brand" @click="router.push('/')">📋 게시판</div>
    <div class="navbar-right">
      <span class="navbar-username">{{ authStore.username }}님</span>
      <button class="btn-logout" @click="handleLogout">로그아웃</button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>