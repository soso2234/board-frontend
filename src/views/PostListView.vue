<template>
  <div class="list-container">
    <div class="list-header">
      <h2>게시판</h2>
      <button @click="router.push('/posts/create')">글쓰기</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="post in posts"
          :key="post.id"
          @click="router.push(`/posts/${post.id}`)"
          class="post-row"
        >
          <td>{{ post.id }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.author }}</td>
          <td>{{ formatDate(post.createdAt) }}</td>
        </tr>
      </tbody>
    </table>
    <p v-if="posts.length === 0" class="empty">게시글이 없습니다.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getPosts } from '@/api/post.js'

const router = useRouter()
const posts = ref([])

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('ko-KR')
}

onMounted(async () => {
  const response = await getPosts()
  posts.value = response.data
})
</script>