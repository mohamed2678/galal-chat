<template>
  <div class="welcome container">
    <div class="card">
      <div class="card-content center-align">
        <h2 class="teal-text">Welcome</h2>
        <form @submit.prevent="enterChat">
          <label for="name">Enter Your Name:</label>
          <input type="text" id="name" v-model="name" />

          <label for="roomId">Enter Room ID:</label>
          <input type="text" id="roomId" v-model="roomId" @blur="checkRoom" />

          <div v-if="requiresPassword">
            <label for="password">Room Password:</label>
            <input type="password" id="password" v-model="password" />
          </div>

          <p v-if="feedback" class="red-text">{{ feedback }}</p>
          <button class="btn teal">Enter Chat</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { db } from '@/firebase/init'
import { doc, getDoc } from 'firebase/firestore'

const name = ref<string | null>(null)
const roomId = ref<string | null>(null)
const password = ref<string | null>(null)
const requiresPassword = ref(false)
const roomPassword = ref<string | null>(null)
const feedback = ref<string | null>(null)

const router = useRouter()

const checkRoom = async () => {
  if (!roomId.value) return

  const roomRef = doc(db, 'rooms', roomId.value)
  const roomSnap = await getDoc(roomRef)

  if (!roomSnap.exists()) {
    feedback.value = 'Room does not exist.'
    requiresPassword.value = false
    return
  }

  const data = roomSnap.data()
  requiresPassword.value = !!data.requiresPassword
  roomPassword.value = data.password || null
  feedback.value = null
}

const enterChat = async () => {
  if (!name.value || !roomId.value) {
    feedback.value = 'Please enter both your name and a room ID'
    return
  }

  const roomRef = doc(db, 'rooms', roomId.value)
  const roomSnap = await getDoc(roomRef)

  if (!roomSnap.exists()) {
    feedback.value = 'Room does not exist.'
    return
  }

  const data = roomSnap.data()

  if (data.requiresPassword) {
    requiresPassword.value = true
    roomPassword.value = data.password
    if (!password.value) {
      feedback.value = 'This room requires a password.'
      return
    }
    if (password.value !== roomPassword.value) {
      feedback.value = 'Incorrect password.'
      return
    }
  }

  router.push({ name: 'Chat', params: { roomId: roomId.value, name: name.value } })
}
</script>

<style>
.welcome {
  max-width: 400px;
  margin-top: 100px;
}
.welcome h2 {
  font-size: 3em;
}
.welcome button {
  margin: 30px;
}
</style>
