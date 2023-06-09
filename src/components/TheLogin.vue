<!-- <script setup lang="ts">
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

const formData = {
  email: ref(''),
  password: ref(''),
  userType: ref(''),
}
const rules = {
  required: (value: String) => !!value || 'Required.',
  email: (value: String) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value.toString()) || 'Invalid email address.'
  },
}
const validateForm = () => {
  let isValid = true

  if (!formData.email.value || !rules.email(formData.email.value)) {
    // Email is required or invalid
    isValid = false
  }

  if (!formData.password.value || !rules.required(formData.password.value)) {
    // Password is required
    isValid = false
  }

  // Additional validations for other fields if needed

  return isValid
}
const onSubmit = async () => {
  const isValid = validateForm()

  if (isValid) {
    // Perform login or proceed to the next page
  }
  else {
    // Show validation errors or prevent form submission
  }
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
    <v-text-field v-model="formData.email.value" label="Email" :rules="[rules.required, rules.email]" placeholder="Your email" outlined />
    <v-text-field v-model="formData.password.value" label="Password" :rules="[rules.required]" placeholder="Your password" outlined />
    <v-btn color="#1C658C" class="mt-4" block @click.prevent="onSubmit">
      <span class="text-white">
        Login
      </span>
    </v-btn>
  </v-form>
</template> -->
<script setup lang="ts">
import { useUserStore } from '~/stores/user'
// import { ref } from 'vue'

const userStore = useUserStore()

const formData = {
  email: ref(''),
  password: ref(''),
  userType: ref(''),
}

const validationErrors = {
  email: ref(''),
  password: ref(''),
}

const rules = {
  required: (value: string) => !!value || 'Required.',
  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value.toString()) || 'Invalid email address.'
  },
}

const validateForm = () => {
  let isValid = true

  if (!formData.email.value || !rules.email(formData.email.value)) {
    validationErrors.email.value = 'Invalid email address.'
    isValid = false
  }
  else {
    validationErrors.email.value = ''
  }

  if (!formData.password.value || !rules.required(formData.password.value)) {
    validationErrors.password.value = 'Password is required.'
    isValid = false
  }
  else {
    validationErrors.password.value = ''
  }

  // Additional validations for other fields if needed

  return isValid
}

const onSubmit = async () => {
  const isValid = validateForm()

  if (isValid) {
    // eslint-disable-next-line no-console
    console.log('Checking Credentials')
    try {
      await userStore.checkCredentials(
        formData.email.value,
        formData.password.value,
        formData.userType.value,
      )
      // eslint-disable-next-line no-console
      console.log(userStore.user.id)
      // TODO: Route to next page after successful login
    }
    catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error during Login. Check Credentials')
      // Show popup for wrong credentials
      // You can use a library like Vuetify Dialog or create a custom component for the popup
    }
  }
  else {
    // eslint-disable-next-line no-console
    console.log('Form is not valid. Please check the fields.')
    // Show validation errors to the user
    // You can update the template to display the error messages below the corresponding input fields
  }
}
</script>

<template>
  <v-form>
    <v-radio-group v-model="formData.userType.value" inline>
      <v-radio label="Representative" value="representative" />
      <v-radio label="Data Requestor" value="requestor" />
    </v-radio-group>
    <v-text-field
      v-model="formData.email.value"
      label="Email"
      :rules="[rules.required, rules.email]"
      :error-messages="validationErrors.email.value"
      placeholder="Your email"
      outlined
    />
    <v-text-field
      v-model="formData.password.value"
      :rules="[rules.required]"
      label="Password"
      type="password"
      placeholder="Your password"
      outlined
    />
    <v-btn color="#1C658C" class="mt-4" block @click.prevent="onSubmit">
      <span class="text-white">
        Login
      </span>
    </v-btn>
  </v-form>
</template>
