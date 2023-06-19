<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

const formData = {
  name: ref(''),
  email: ref(''),
  password: ref(''),
  companyName: ref(''),
  phoneNumber: ref(''),
}

const validationErrors = {
  name: ref(''),
  email: ref(''),
  password: ref(''),
  companyName: ref(''),
  phoneNumber: ref(''),
}

const rules = {
  required: (value: string) => !!value || 'Required.',
  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value.toString()) || 'Invalid email address.'
  },
  password: (value: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    return passwordRegex.test(value.toString()) || 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.'
  },
  phoneNumber: (value: string) => {
    const phoneNumberRegex = /^\d{10}$/
    return phoneNumberRegex.test(value.toString()) || 'Phone number must be 10 digits long.'
  },
}

const validateForm = () => {
  let isValid = true

  if (!formData.name.value || !rules.required(formData.name.value)) {
    validationErrors.name.value = 'User Name is required'
    isValid = false
  }
  else {
    validationErrors.name.value = ''
  }

  if (!formData.email.value || !rules.email(formData.email.value)) {
    validationErrors.email.value = 'Invalid email address.'
    isValid = false
  }
  else {
    validationErrors.email.value = ''
  }

  if (!formData.password.value || !rules.password(formData.password.value)) {
    validationErrors.password.value = 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.'
    isValid = false
  }
  else {
    validationErrors.password.value = ''
  }

  if (!formData.companyName.value || !rules.required(formData.companyName.value)) {
    validationErrors.companyName.value = 'Company name is required.'
    isValid = false
  }
  else {
    validationErrors.companyName.value = ''
  }

  if (!formData.phoneNumber.value || !rules.phoneNumber(formData.phoneNumber.value)) {
    validationErrors.phoneNumber.value = 'Phone number must be 10 digits long.'
    isValid = false
  }
  else {
    validationErrors.phoneNumber.value = ''
  }

  return isValid
}

const onSubmit = async () => {
  const isValid = validateForm()

  if (isValid) {
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
}
</script>

<template>
  <v-form>
    <v-text-field
      v-model="formData.name.value" label="Name" :rules="[rules.required]"
      :error-messages="validationErrors.name.value"
    />
    <v-text-field
      v-model="formData.email.value" label="Email" type="email" :rules="[rules.required, rules.email]"
      :error-messages="validationErrors.email.value"
    />
    <v-text-field
      v-model="formData.password.value" label="Password" type="password" :rules="[rules.required, rules.password]"
      :error-messages="validationErrors.password.value"
    />
    <v-text-field
      v-model="formData.companyName.value" label="Company Name" :rules="[rules.required]"
      :error-messages="validationErrors.companyName.value"
    />
    <v-text-field
      v-model="formData.phoneNumber.value" label="Phone Number" :rules="[rules.required, rules.phoneNumber]"
      :error-messages="validationErrors.phoneNumber.value"
    />
    <v-btn color="#1C658C" block @click.prevent="onSubmit">
      <span class="text-white">
        Submit
      </span>
    </v-btn>
  </v-form>
</template>
