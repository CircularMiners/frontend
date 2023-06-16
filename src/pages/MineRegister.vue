<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '~/stores/user'

const mineName = ref('')
const mineLocation = ref('')
const mineDescription = ref('')

const userStore = useUserStore()

async function register() {
  const data = {
    mineName: mineName.value,
    mineLocation: mineLocation.value,
    mineDescription: mineDescription.value,
    mineRepresentativeId: userStore.user?.id,
  }
  try {
    const response = await axios.post('https://urchin-app-q36en.ondigitalocean.app/backend2/mine/addmine', data)
    // eslint-disable-next-line no-console
    console.log(response.data)
    // TODO: Handle successful registration
  }
  catch (error) {
    console.error(error)
    // TODO: Handle registration error
  }
}
</script>

<template>
  <v-card-title class="text-center registration-title">
    <h2>Register the Mine</h2>
  </v-card-title>
  <v-card-text>
    <v-form @submit.prevent="register">
      <v-text-field v-model="mineName" label="Mine Name" class="registration-text-field" />
      <v-text-field v-model="mineLocation" label="Mine Location" class="registration-text-field" />
      <v-text-field v-model="mineDescription" label="Mine Description" class="registration-text-field" />
    </v-form>
    <div class="registration-separator">
      <router-link to="/">
        <v-btn color="primary" text class="registration-btn" @click="register">
          Register
        </v-btn>
      </router-link>
    </div>
  </v-card-text>
</template>

<route lang="yaml">
meta:
  requiresAuth: true
</route>
