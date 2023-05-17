<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

const formData = {
  email: ref(''),
  password: ref(''),
  userType: ref(''),
}
// const rules = {
//   required: value => !!value || 'Required.',
//   email: (value) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     return emailRegex.test(value) || 'Invalid email address.'
//   },
// }
const onSubmit = async () => {
  // eslint-disable-next-line no-console
  console.log('Checking Credentials')
  try {
    await userStore.checkCredentials(
      formData.email.value,
      formData.password.value,
      formData.userType.value,
    )
    // TODO::route to next page after login
    // eslint-disable-next-line no-console
    console.log(userStore.user.id)
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error during Login. Check Credentials')
  }
}
</script>

<template>
  <v-form>
    <v-radio-group
      v-model="formData.userType.value"
      inline
    >
      <v-radio
        label="Representative"
        value="representative"
      />
      <v-radio
        label="Data Requestor"
        value="requestor"
      />
    </v-radio-group>
    <v-text-field v-model="formData.email.value" label="Email" placeholder="Your email" outlined />
    <v-text-field v-model="formData.password.value" label="Password" placeholder="Your password" outlined />
    <v-btn color="#1C658C" class="mt-4" block @click.prevent="onSubmit">
      <span class="text-white">
        Login
      </span>
    </v-btn>
  </v-form>
</template>
