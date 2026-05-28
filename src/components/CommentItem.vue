<template>
  <div class="comment-item">
    <div class="comment-meta">
      <span class="comment-author">{{ comment.author }}</span>
      <span class="comment-date">{{ formatDate(comment.createdAt) }}</span>
    </div>

    <!-- 수정 모드 -->
    <div v-if="isEditing" class="reply-input-box">
      <input
        v-model="editContent"
        type="text"
        @keyup.enter="submitEdit"
      />
      <button class="btn-comment" @click="submitEdit">완료</button>
      <button class="btn-comment-delete" @click="cancelEdit">취소</button>
    </div>

    <!-- 일반 모드 -->
    <div v-else class="comment-content">{{ comment.content }}</div>

    <div class="comment-actions">
      <button class="btn-reply" @click="toggleReply">답글</button>
      <template v-if="comment.author === authStore.username">
        <button class="btn-reply" @click="toggleEdit">수정</button>
        <button class="btn-comment-delete" @click="$emit('delete', comment.id)">삭제</button>
      </template>
    </div>

    <!-- 대댓글 입력창 -->
    <div v-if="showReply" class="reply-input-box">
      <input
        v-model="replyContent"
        type="text"
        placeholder="대댓글을 입력하세요."
        @keyup.enter="submitReply"
      />
      <button class="btn-comment" @click="submitReply">등록</button>
    </div>

    <!-- 대댓글 목록 (재귀) -->
    <div v-if="comment.children && comment.children.length > 0" class="children-comments">
      <CommentItem
        v-for="child in comment.children"
        :key="child.id"
        :comment="child"
        @delete="$emit('delete', $event)"
        @reply="$emit('reply', $event)"
        @update="$emit('update', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.js'

const props = defineProps({
  comment: Object
})

const emit = defineEmits(['delete', 'reply', 'update'])

const authStore = useAuthStore()
const showReply = ref(false)
const replyContent = ref('')
const isEditing = ref(false)
const editContent = ref('')

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('ko-KR')
}

const toggleReply = () => {
  showReply.value = !showReply.value
  replyContent.value = ''
}

const toggleEdit = () => {
  isEditing.value = true
  editContent.value = props.comment.content
}

const cancelEdit = () => {
  isEditing.value = false
  editContent.value = ''
}

const submitEdit = () => {
  if (!editContent.value.trim()) return
  emit('update', {
    commentId: props.comment.id,
    content: editContent.value
  })
  isEditing.value = false
}

const submitReply = () => {
  if (!replyContent.value.trim()) return
  emit('reply', {
    content: replyContent.value,
    parentId: props.comment.id
  })
  replyContent.value = ''
  showReply.value = false
}
</script>