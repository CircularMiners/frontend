<script setup lang="ts">
import { useUserStore } from '~/stores/user'
const router = useRouter()

const userStore = useUserStore()

const formData = {
  name: ref(''),
  email: ref(''),
  password: ref(''),
  companyName: ref(''),
  phoneNumber: ref(''),
}

const onSubmit = async () => {
  try {
    await userStore.registerRepresentative(
      formData.name.value,
      formData.email.value,
      formData.password.value,
      formData.companyName.value,
      formData.phoneNumber.value,
    )
  }
  catch (error) {
    console.error('Error submitting form', error)
  }
}
</script>

<template>
  <v-form>
    <v-text-field v-model="formData.name.value" label="Name" />
    <v-text-field v-model="formData.email.value" label="Email" type="email" />
    <v-text-field v-model="formData.password.value" label="Password" type="password" />
    <v-text-field v-model="formData.companyName.value" label="Company Name" />
    <v-text-field v-model="formData.phoneNumber.value" label="Phone Number" />
    <v-btn color="#1C658C" block @click.prevent="onSubmit">
      <span class="text-white">
        Submit
      </span>
    </v-btn>
  </v-form>
</template>
