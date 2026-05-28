<template>
  <div class="container">
    <div class="box">
      <h2>회원가입</h2>
      <div class="form-group">
        <input
          v-model="form.username"
          type="text"
          placeholder="아이디"
        />
      </div>
      <div class="form-group">
        <input
          v-model="form.password"
          type="password"
          placeholder="비밀번호"
        />
      </div>
      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
      <p v-if="successMsg" class="success">{{ successMsg }}</p>
      <button class="btn-primary" @click="handleSignup">회원가입</button>
      <p class="link-text">
        이미 계정이 있으신가요?
        <RouterLink to="/login">로그인</RouterLink>
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
const successMsg = ref('')

const handleSignup = async () => {
  errorMsg.value = ''
  successMsg.value = ''

  if(!form.value.username.trim()) {
    errorMsg.value = '아이디를 입력하세요.'
    return
  }
  if(!form.value.password.trim()) {
    errorMsg.value = '비밀번호를 입력하세요.'
    return
  }

  try {
    await authStore.signup(form.value)
    successMsg.value = '회원가입이 완료되었습니다!'
    setTimeout(() => router.push('/login'), 1500)
  } catch (e) {
    errorMsg.value = '이미 사용 중인 아이디입니다.'
  }
}
</script>