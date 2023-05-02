<script>
import { ref } from 'vue'

export default {
  name: 'RegistrationVendors',
  setup() {
    const firstName = ref('')
    const lastName = ref('')
    const email = ref('')
    const phoneNumber = ref('')
    const companyName = ref('')
    const jobTitle = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const acceptTerms = ref(false)

    const rules = {
      required: value => !!value || 'Required.',
      email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(value) || 'Invalid email address.'
      },
      passwordMatch: () => {
        if (password.value !== confirmPassword.value)
          return 'Passwords do not match'

        return true
      },
    }

    function register() {
      // TODO: Implement registration functionality
    }

    return {
      firstName,
      lastName,
      email,
      phoneNumber,
      companyName,
      jobTitle,
      password,
      confirmPassword,
      acceptTerms,
      register,
      rules,
    }
  },
}
</script>

<template>
  <v-container fluid class="registration-container">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="registration-card">
          <v-card-title class="text-center registration-title">
            <h2>Registration for Vendors</h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="register">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field v-model="firstName" label="First Name" class="registration-text-field" :rules="[rules.required]" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="lastName" label="Last Name" class="registration-text-field" :rules="[rules.required]" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field v-model="email" label="Email" class="registration-text-field" :rules="[rules.required, rules.email]" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="phoneNumber" label="Phone Number" class="registration-text-field" :rules="[rules.required]" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field v-model="companyName" label="Company Name" class="registration-text-field" :rules="[rules.required]" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="jobTitle" label="Job Title" class="registration-text-field" :rules="[rules.required]" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field v-model="password" label="Password" type="password" class="registration-text-field" :rules="[rules.required]" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="confirmPassword" label="Confirm Password" type="password" class="registration-text-field" :rules="[rules.required, confirmPasswordRule]" />
                </v-col>
              </v-row>
              <v-checkbox v-model="acceptTerms" label="I accept the terms and conditions" class="registration-checkbox" />
              <v-btn type="submit" color="#1C658C" class="mt-4 registration-btn">
                Register
              </v-btn>
            </v-form>
            <div class="registration-separator">
              <span>Already have an account? </span>
              <v-btn color="#667085" text class="registration-signin-btn">
                Sign in
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
