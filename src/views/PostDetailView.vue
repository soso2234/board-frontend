<template>
  <div class="detail-container">
    <div class="detail-header">
      <h2>{{ post.title }}</h2>
      <div class="detail-meta">
        <span>작성자: {{ post.author }}</span>
        &nbsp;|&nbsp;
        <span>작성일: {{ formatDate(post.createdAt) }}</span>
      </div>
    </div>
    <div class="detail-content">
      {{ post.content }}
    </div>
    <div class="detail-buttons">
      <button class="btn-back" @click="router.push('/')">목록</button>
      <template v-if="isAuthor">
        <button class="btn-edit" @click="router.push(`/posts/${post.id}/edit`)">수정</button>
        <button class="btn-delete" @click="handleDelete">삭제</button>
      </template>
    </div>

    <!-- 댓글 섹션 -->
    <div class="comment-section">
      <h3>댓글 {{ comments.length }}개</h3>

      <!-- 댓글 입력 -->
      <div class="comment-input-box">
        <input
          v-model="commentContent"
          type="text"
          placeholder="댓글을 입력하세요."
          @keyup.enter="submitComment"
        />
        <button class="btn-comment" @click="submitComment">등록</button>
      </div>

      <!-- 댓글 목록 -->
      <CommentItem
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        @delete="handleDeleteComment"
        @reply="handleReply"
        @update="handleUpdateComment"
      />

      <p v-if="comments.length === 0" class="empty">첫 번째 댓글을 작성해보세요!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import { getPost, deletePost, getComments, createComment, deleteComment, updateComment } from '@/api/post.js'
import CommentItem from '@/components/CommentItem.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const post = ref({})
const comments = ref([])
const commentContent = ref('')

const isAuthor = computed(() => post.value.author === authStore.username)

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('ko-KR')
}

const loadComments = async () => {
  const response = await getComments(route.params.id)
  comments.value = response.data
}

onMounted(async () => {
  const response = await getPost(route.params.id)
  post.value = response.data
  await loadComments()
})

const handleDelete = async () => {
  if (!confirm('정말 삭제하시겠습니까?')) return
  await deletePost(route.params.id)
  router.push('/')
}

const submitComment = async () => {
  if (!commentContent.value.trim()) return
  await createComment(route.params.id, {
    content: commentContent.value,
    parentId: null
  })
  commentContent.value = ''
  await loadComments()
}

const handleReply = async (data) => {
  await createComment(route.params.id, {
    content: data.content,
    parentId: data.parentId
  })
  await loadComments()
}

const handleDeleteComment = async (commentId) => {
  if (!confirm('댓글을 삭제하시겠습니까?')) return
  await deleteComment(route.params.id, commentId)
  await loadComments()
}

const handleUpdateComment = async (data) => {
  await updateComment(route.params.id, data.commentId, {
    content: data.content
  })
  await loadComments()
}
</script>