<template>
  <div class="container">
    <div class="box">
      <h2>로그인</h2>
      <div class="form-group">
        <input v-model="form.username" type="text" placeholder="아이디" @keyup.enter="handleLogin"/>
      </div>
      <div class="form-group">
        <input v-model="form.password" type="password" placeholder="비밀번호" @keyup.enter="handleLogin"/>
      </div>
      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
      <button class="btn-primary" @click="handleLogin">로그인</button>
      <p class="link-text">
        계정이 없으신가요?
        <RouterLink to="/signup">회원가입</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  username: '',
  password: ''
})
const errorMsg = ref('')

const handleLogin = async () => {
  errorMsg.value = ''

  if(!form.value.username.trim()) {
    errorMsg.value = '아이디를 입력하세요.'
    return
  }

  if(!form.value.password.trim()) {
    errorMsg.value = '비밀번호를 입력하세요.'
    return
  }

  try {
    await authStore.login(form.value)
    router.push('/')
  } catch (e) {
    errorMsg.value = '아이디 또는 비밀번호가 올바르지 않습니다.'
  }
}
</script>