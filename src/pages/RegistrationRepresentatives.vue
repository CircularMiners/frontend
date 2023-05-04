<!-- <script>
import { ref } from 'vue'

export default {
  name: 'RegistrationVendors',
  setup() {
    const firstName = ref('')
    const lastName = ref('')
    const email = ref('')
    const phoneNumber = ref('')
    const companyName = ref('')
    const jobType = ref('')
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
      const formData = {
        name: `${firstName.value} ${lastName.value}`,
        email: email.value,
        password: password.value,
        phoneNumber: phoneNumber.value,
        userType: 'representative',
        companyName: companyName.value,
        jobType: jobType.value,
      }

      fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok)
            throw new Error('Network response was not ok')
          // TODO: Handle successful registration response
        })
        .catch((error) => {
          // TODO: Handle registration error
          console.error('There was an error registering the user', error)
        })
    }

    return {
      fullName,
      email,
      phoneNumber,
      companyName,
      jobType,
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
              <v-row>
                <v-col>
                  <v-checkbox v-model="acceptTerms" label="I accept the terms and conditions" class="registration-checkbox" style="margin-top: 6px;" />
                </v-col>
                <v-col>
                  <v-btn type="submit" color="#1C658C" class="mt-4 registration-btn">
                    Register
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
            <div class="registration-separator">
              <span>Already have an account? </span>
              <router-link to="/login">
                <v-btn color="#1C658C" text class="registration-login-btn">
                  Sign in
                </v-btn>
              </router-link>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template> -->
<script>
import axios from 'axios'

export default {
  name: 'MyForm',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      companyName: '',
      jobType: '',
    }
  },
  methods: {
    async submitForm() {
      const formData = {
        name: `${this.firstName} ${this.lastName}`,
        email: this.email,
        password: this.password,
        phoneNumber: this.phoneNumber,
        userType: 'representative',
        companyName: this.companyName,
        jobType: this.jobType,
      }

      try {
        const response = await axios.post('/api/submit-form', formData)
        // eslint-disable-next-line no-console
        console.log('Form submitted successfully:', response.data)
      }
      catch (error) {
        console.error('Error submitting form:', error)
      }
    },
  },
}
</script>

<template>
  <v-container fluid class="registration-container">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="registration-card">
          <v-card-title class="text-center registration-title">
            <h2>Registration for Representatives</h2>
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
              <v-row>
                <v-col>
                  <v-checkbox v-model="acceptTerms" label="I accept the terms and conditions" class="registration-checkbox" style="margin-top: 6px;" />
                </v-col>
                <v-col>
                  <v-btn type="submit" color="#1C658C" class="mt-4 registration-btn">
                    Register
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
            <div class="registration-separator">
              <span>Already have an account? </span>
              <router-link to="/login">
                <v-btn color="#1C658C" text class="registration-login-btn">
                  Sign in
                </v-btn>
              </router-link>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
