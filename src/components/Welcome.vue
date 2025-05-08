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

<script>
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/init'
import { watch } from 'vue'

export default {
  name: 'Welcome',
  data() {
    return {
      name: null,
      roomId: null,
      password: null,
      requiresPassword: false,
      roomPassword: null,
      feedback: null,
    }
  },
  methods: {
    async checkRoom() {
      if (!this.roomId) return
      const roomRef = doc(db, 'rooms', this.roomId)
      const roomSnap = await getDoc(roomRef)

      if (!roomSnap.exists()) {
        this.feedback = 'Room does not exist.'
        this.requiresPassword = false
        return
      }

      const data = roomSnap.data()
      this.requiresPassword = !!data.requiresPassword
      this.roomPassword = data.password || null
      this.feedback = null
    },

    async enterChat() {
      if (!this.name || !this.roomId) {
        this.feedback = 'Please enter both your name and a room ID'
        return
      }

      const roomRef = doc(db, 'rooms', this.roomId)
      const roomSnap = await getDoc(roomRef)

      if (!roomSnap.exists()) {
        this.feedback = 'Room does not exist.'
        return
      }

      const data = roomSnap.data()

      if (data.requiresPassword) {
        this.requiresPassword = true
        this.roomPassword = data.password
        if (!this.password) {
          this.feedback = 'This room requires a password.'
          return
        }
        if (this.password !== this.roomPassword) {
          this.feedback = 'Incorrect password.'
          return
        }
      }

      this.$router.push({
        name: 'Chat',
        params: { roomId: this.roomId, name: this.name },
      })
    },
  },
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
