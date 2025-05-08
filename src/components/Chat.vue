<template>
  <div class="chat container">
    <button class="btn-floating btn-large waves-effect waves-light teal" @click="$router.push('/')">
      <i class="material-icons">arrow_back</i>
    </button>
    <h2 class="center teal-text">Private Chat - Room: {{ roomId }}</h2>
    <div class="card">
      <div class="card-content" ref="chatContainer">
        <ul class="messages">
          <li v-for="message in messages" :key="message.id">
            <span class="teal-text">{{ message.name }}: </span>
            <span class="grey-text newMsg text-darken-3">{{ message.content }}</span>
            <span class="grey-text time">{{ message.timestamp }}</span>
          </li>
        </ul>
      </div>
      <div class="card-action">
        <NewMessage :name="name" :roomId="roomId" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUpdated } from 'vue'
import { db } from '@/firebase/init'
import { collection, onSnapshot, orderBy, query, DocumentData } from 'firebase/firestore'
import moment from 'moment'
import NewMessage from '@/components/NewMessage.vue'

// Props
const props = defineProps<{
  name: string
  roomId: string
}>()

// Refs
const chatContainer = ref<HTMLElement | null>(null)
const messages = ref<
  Array<{
    id: string
    name: string
    content: string
    timestamp: string
  }>
>([])

// Fetch messages from Firestore
const fetchMessages = () => {
  if (!props.roomId) return

  const refMsg = collection(db, `rooms/${props.roomId}/messages`)
  const messagesQuery = query(refMsg, orderBy('timestamp'))

  onSnapshot(messagesQuery, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const doc = change.doc
        const data = doc.data() as DocumentData
        messages.value.push({
          id: doc.id,
          name: data.name,
          content: data.content,
          timestamp: moment(data.timestamp?.toDate?.() || data.timestamp).format('lll'),
        })
      }
    })
  })
}

// Scroll to bottom
const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

// Lifecycle hooks
onMounted(fetchMessages)
onUpdated(scrollToBottom)
</script>

<style>
.card .card-content {
  max-height: 700px;
  overflow: hidden;
  overflow-y: auto;
  padding: 0 20px;
  margin-bottom: 20px;
}
.chat {
  font-size: 1.5em;
  margin-bottom: 40px;
}
.chat button {
  margin-top: 20px;
}
.chat span {
  font-size: 1.4em;
}
.chat .messages {
  position: relative;
}
.chat .time {
  font-size: 20px;
  position: absolute;
  right: 0;
}
@media (max-width: 600px) {
  .chat {
    font-size: 1.2em;
  }
  .chat span {
    font-size: 0.7em;
  }
  .chat .time {
    font-size: 10px;
    position: absolute;
  }
  .newMsg {
    max-width: 200px;
    display: flex;
  }
}
.chat .card-content {
  max-height: 500px;
}
</style>
