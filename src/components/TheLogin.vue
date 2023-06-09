<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user'
const router = useRouter()

const userStore = useUserStore()
const formData = {
  email: '',
  password: '',
  userType: '',
}
const rules = {
  required: (value: String) => !!value || 'Required.',
  email: (value: String) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value.toString()) || 'Invalid email address.'
  },
}
const onSubmit = async () => {
  // eslint-disable-next-line no-console
  console.log('Checking Credentials')
  try {
    await userStore.checkCredentials(
      formData.email.value,
      formData.password.value,
      formData.userType.value,
    ).then(() => {
      if (userStore?.user)
        router.push('/')
    })
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error during Login. Check Credentials')
  }
}
</script>

<template>
  <v-form>
    <v-radio-group v-model="formData.userType">
      <v-radio label="Representative" value="representative" />
      <v-radio label="Vendor" value="vendor" />
    </v-radio-group>
    <v-text-field v-model="formData.email" label="Email" placeholder="Your email" :rules="[rules.required]" outlined />
    <v-text-field v-model="formData.password" label="Password" placeholder="Your password" :rules="[rules.required]" outlined />
    <v-btn color="#1C658C" class="mt-4" block @click="onSubmit">
      <span class="text-white">
        Login
      </span>
    </v-btn>
  </v-form>
</template>
