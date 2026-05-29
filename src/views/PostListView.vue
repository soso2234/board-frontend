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
          <th>조회수</th>
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
          <td>
            {{ post.title }}
            <span v-if="post.commentCount > 0" class="comment-count">
              ({{ post.commentCount }})
            </span>
          </td>
          <td>{{ post.author }}</td>
          <td>{{ formatDate(post.createdAt) }}</td>
          <td>{{ post.viewCount }}</td>
        </tr>
      </tbody>
    </table>
    <p v-if="posts.length === 0" class="empty">게시글이 없습니다.</p>

    <!-- 페이징 -->
    <div class="pagination">
      <button
        :disabled="currentPage === 0"
        @click="loadPosts(currentPage - 1)"
      >이전</button>

      <button
        v-for="page in totalPages"
        :key="page"
        :class="{ active: currentPage === page - 1 }"
        @click="loadPosts(page - 1)"
      >{{ page }}</button>

      <button
        :disabled="currentPage === totalPages - 1"
        @click="loadPosts(currentPage + 1)"
      >다음</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getPosts } from '@/api/post.js'

const router = useRouter()
const posts = ref([])
const currentPage = ref(0)
const totalPages = ref(0)

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('ko-KR')
}

const loadPosts = async (page = 0) => {
  const response = await getPosts(page)
  posts.value = response.data.content
  currentPage.value = response.data.number
  totalPages.value = response.data.totalPages
}

onMounted(() => {
  loadPosts()
})
</script>