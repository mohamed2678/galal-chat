<template>
  <div class="new-message">
    <form @submit.prevent="addMessage">
      <label for="new-message">New Message (Enter to add):</label>
      <input
        type="text"
        id="new-message"
        v-model="newMessage"
        placeholder="Type your message here..."
        required
      />
      <p class="red-text" v-if="feedback">{{ feedback }}</p>
    </form>
  </div>
</template>

<script>
import { db } from '@/firebase/init'
import { collection, addDoc } from 'firebase/firestore'

export default {
  name: 'NewMessage',
  props: ['name'],
  data() {
    return {
      newMessage: null,
      feedback: null,
    }
  },
  methods: {
    async addMessage() {
      if (this.newMessage) {
        try {
          // Use the modular SDK's collection and addDoc functions
          await addDoc(collection(db, 'messages'), {
            content: this.newMessage,
            name: this.name,
            timestamp: Date.now(),
          })
          this.newMessage = null // Clear the input field after sending the message
          this.feedback = null // Clear the feedback message after sending the message
        } catch (err) {
          console.error('Error adding message:', err)
        }
      } else {
        this.feedback = 'You must enter a message in order to send one'
      }
    },
  },
}
</script>
