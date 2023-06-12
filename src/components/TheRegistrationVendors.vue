<script setup lang="ts">
import { useUserStore } from '~/stores/user'
const router = useRouter()

const userStore = useUserStore()

const formData = {
  name: ref(''),
  email: ref(''),
  password: ref(''),
  companyName: ref(''),
}

const onSubmit = async () => {
  // eslint-disable-next-line no-console
  console.log('Submitting form', formData)
  try {
    await userStore.registerVendor(
      formData.name.value,
      formData.email.value,
      formData.password.value,
      formData.companyName.value,
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
    <v-btn color="#1C658C" block to="/" @click.prevent="onSubmit">
      <span class="text-white">
        Submit
      </span>
    </v-btn>
  </v-form>
</template>
