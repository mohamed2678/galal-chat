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

<script>
import { db } from '@/firebase/init'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import NewMessage from '@/components/NewMessage.vue'
import moment from 'moment'
export default {
  name: 'Chat',
  props: ['name', 'roomId'],
  components: {
    NewMessage,
  },
  data() {
    return {
      messages: [],
    }
  },
  methods: {
    fetchMessages() {
      // console.log('Room ID:', this.roomId) // Debugging: Check if roomId is correct
      if (!this.roomId) {
        // console.error('Room ID is undefined') // Debugging: Log error if roomId is missing
        return
      }
      const ref = collection(db, `rooms/${this.roomId}/messages`)
      const messagesQuery = query(ref, orderBy('timestamp'))
      onSnapshot(messagesQuery, (snapshot) => {
        //console.log('Snapshot size:', snapshot.size) // Debugging: Check if messages exist
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            let doc = change.doc
            // console.log('New message:', doc.data()) // Debugging: Log message data
            this.messages.push({
              id: doc.id,
              name: doc.data().name,
              content: doc.data().content,
              timestamp: moment(doc.data().timestamp).format('lll'),
            })
          }
        })
      })
    },
    scrollToBottom() {
      const chatContainer = this.$refs.chatContainer
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight
      }
    },
  },
  created() {
    this.fetchMessages()
  },
  updated() {
    this.scrollToBottom() // Ensure the chat scrolls to the bottom after DOM updates
  },
}
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
