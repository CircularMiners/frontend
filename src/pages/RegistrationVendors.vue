<script>
import { ref } from 'vue'
import { submitForm } from '~/services/register_vendor'

export default {
  name: 'MyForm',
  setup() {
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
        await submitForm(
          formData.name.value,
          formData.email.value,
          formData.password.value,
          formData.companyName.value,
        )
        // eslint-disable-next-line no-console
        console.log('Form submitted successfully')
      }
      catch (error) {
        console.error('Error submitting form', error)
      }
    }

    return {
      formData,
      onSubmit,
    }
  },
}
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-form>
          <v-text-field v-model="formData.name.value" label="Name" />
          <v-text-field v-model="formData.email.value" label="Email" type="email" />
          <v-text-field v-model="formData.password.value" label="Password" type="password" />
          <v-text-field v-model="formData.companyName.value" label="Company Name" />
          <v-btn color="primary" to="/login" @click.prevent="onSubmit">
            Submit
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
