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

<script lang="ts" setup>
import { ref } from 'vue'
import { db } from '@/firebase/init'
import { collection, addDoc } from 'firebase/firestore'

// Props
const props = defineProps<{
  name: string
  roomId: string
}>()

// Reactive variables
const newMessage = ref<string | null>(null)
const feedback = ref<string | null>(null)

// Send message function
const addMessage = async () => {
  if (newMessage.value) {
    try {
      await addDoc(collection(db, 'rooms', props.roomId, 'messages'), {
        content: newMessage.value,
        name: props.name,
        timestamp: Date.now(),
      })
      newMessage.value = null
      feedback.value = null
    } catch (err) {
      console.error('Error adding message:', err)
    }
  } else {
    feedback.value = 'You must enter a message in order to send one'
  }
}
</script>
