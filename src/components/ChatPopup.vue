<template>
  <div class="chat-popup-wrapper">
    <!-- 채팅창 -->
    <div v-if="isOpen" class="chat-popup">
      <div class="chat-popup-header">
        <span>💬 전체 채팅</span>
        <button class="btn-close" @click="isOpen = false">✕</button>
      </div>

      <div class="chat-popup-messages" ref="messageBox">
        <div v-for="(msg, index) in messages" :key="index">
          <template v-if="msg.type === 'TALK'">
            <div v-if="msg.sender !== username" class="message-other">
              <span class="message-sender">{{ msg.sender }}</span>
              <div class="message-bubble other">{{ msg.content }}</div>
            </div>
            <div v-else class="message-mine">
              <div class="message-bubble mine">{{ msg.content }}</div>
            </div>
          </template>
          <template v-else>
            <div class="message-system">{{ msg.content }}</div>
          </template>
        </div>
      </div>

      <div class="chat-popup-input">
        <input
          v-model="inputMessage"
          type="text"
          placeholder="메시지를 입력하세요."
          @keyup.enter="sendMessage"
        />
        <button class="btn-comment" @click="sendMessage">전송</button>
      </div>
    </div>

    <!-- 채팅 토글 버튼 -->
    <button class="btn-chat-toggle" @click="toggleChat">
      💬
    </button>
  </div>
</template>

<script setup>
import { ref, onUnmounted, nextTick } from 'vue'
import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { useAuthStore } from '@/stores/auth.js'
import axios from '@/api/axios.js'

const authStore = useAuthStore()
const username = authStore.username
const messages = ref([])
const inputMessage = ref('')
const isOpen = ref(false)
const messageBox = ref(null)
let stompClient = null
let connected = false

const scrollToBottom = async () => {
  await nextTick()
  if (messageBox.value) {
    messageBox.value.scrollTop = messageBox.value.scrollHeight
  }
}

const loadHistory = async () => {
  const response = await axios.get('/api/chat/history')
  messages.value = response.data
  await scrollToBottom()
}

const connect = () => {
  if (connected) return
  stompClient = new Client({
    webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
    onConnect: () => {
      connected = true
      stompClient.subscribe('/topic/chat', (message) => {
        const received = JSON.parse(message.body)
        messages.value.push(received)
        scrollToBottom()
      })
      stompClient.publish({
        destination: '/app/chat/enter',
        body: JSON.stringify({ sender: username, type: 'ENTER' })
      })
    }
  })
  stompClient.activate()
}

const disconnect = () => {
  if (stompClient && connected) {
    stompClient.publish({
      destination: '/app/chat/leave',
      body: JSON.stringify({ sender: username, type: 'LEAVE' })
    })
    stompClient.deactivate()
    connected = false
  }
}

const toggleChat = async () => {
  isOpen.value = !isOpen.value
  if (isOpen.value && !connected) {
    await loadHistory()
    connect()
  }
  if (isOpen.value) {
    await scrollToBottom()
  }
}

const sendMessage = () => {
  if (!inputMessage.value.trim()) return
  stompClient.publish({
    destination: '/app/chat/send',
    body: JSON.stringify({
      sender: username,
      content: inputMessage.value,
      type: 'TALK'
    })
  })
  inputMessage.value = ''
}

onUnmounted(() => {
  disconnect()
})
</script>