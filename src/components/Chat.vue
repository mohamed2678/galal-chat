<template>
  <div class="chat container">
    <h2 class="center teal-text">Galal-chat</h2>
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
        <NewMessage :name="name" />
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
  props: ['name'],
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
      const ref = collection(db, 'messages')
      const messagesQuery = query(ref, orderBy('timestamp')) // Add the 'orderBy' clause
      onSnapshot(messagesQuery, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            let doc = change.doc
            this.messages.push({
              id: doc.id,
              name: doc.data().name,
              content: doc.data().content,
              timestamp: moment(doc.data().timestamp).format('lll'), // Format the timestamp using moment.js
            })
            this.scrollToBottom() // Scroll to the bottom when a new message is added
          }
        })
      })
    },
    scrollToBottom(offset = 0) {
      const chatContainer = this.$refs.chatContainer
      if (chatContainer) {
        // Scroll to a specific position: scrollHeight - offset
        chatContainer.scrollTop = chatContainer.scrollHeight - offset
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
