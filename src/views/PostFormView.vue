<template>
  <div class="form-container">
    <h2>{{ isEdit ? '게시글 수정' : '게시글 작성' }}</h2>
    <div class="form-group">
      <input
        v-model="form.title"
        type="text"
        placeholder="제목"
      />
    </div>
    <div class="form-group">
      <textarea
        v-model="form.content"
        placeholder="내용을 입력해 주세요."
      />
    </div>
    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    <div class="form-buttons">
      <button class="btn-back" @click="router.push('/')">취소</button>
      <button @click="handleSubmit">{{ isEdit ? '수정' : '작성' }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import { getPost, createPost, updatePost } from '@/api/post.js'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const isEdit = computed(() => !!route.params.id)
const errorMsg = ref('')

const form = ref({
  title: '',
  content: '',
  author: authStore.username
})

onMounted(async () => {
  if (isEdit.value) {
    const response = await getPost(route.params.id)
    form.value.title = response.data.title
    form.value.content = response.data.content
  }
})

const handleSubmit = async () => {
  if (!form.value.title.trim()) {
    errorMsg.value = '제목을 입력해 주세요.'
    return
  }
  if (!form.value.content.trim()) {
    errorMsg.value = '내용을 입력해 주세요.'
    return
  }

  try {
    if (isEdit.value) {
      await updatePost(route.params.id, form.value)
    } else {
      await createPost(form.value)
    }
    router.push('/')
  } catch (e) {
    errorMsg.value = '오류가 발생했습니다. 다시 시도해 주세요.'
  }
}
</script>