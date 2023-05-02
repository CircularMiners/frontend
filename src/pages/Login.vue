<script>
import { ref } from 'vue'

export default {
  name: 'Login',
  setup() {
    const email = ref('')
    const password = ref('')

    const rules = {
      required: value => !!value || 'Required.',
      email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(value) || 'Invalid email address.'
      },
    }

    function login() {
      // TODO: Implement login functionality
    }

    return {
      email,
      password,
      login,
      rules,
    }
  },
}
</script>

<template>
  <v-container fluid class="login-container">
    <v-row justify="left" align="left" style="height: 100%" class="left">
      <v-col cols="12" md="6" class="d-flex justify-center align-center">
        <div class="logo-text">
          <img src="../../assets/MineMatch.png" alt="Logo" class="logo">
          <p class="text">
            Some text about the platform
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row justify="right" align="right" style="height: 100%" class="right">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="login-card">
          <v-card-title class="text-center login-title">
            <h2 class="mb-0">
              Login
            </h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field v-model="email" label="Email" placeholder="Your email" class="login-text-field" :rules="[rules.required, rules.email]" outlined />
              <v-text-field v-model="password" label="Password" placeholder="Your password" type="password" class="login-text-field" :rules="[rules.required]" outlined />
              <v-btn type="submit" color="#1C658C" class="mt-4 login-btn" block>
                Login
              </v-btn>
            </v-form>
            <v-divider class="my-4" />
            <!-- <v-btn color="#1C658C" class="mt-4 create-account-btn" block>Create a new account</v-btn> -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-text-field {
  margin-bottom: 24px;
  width: 100%;
}

.login-container {
  height: 100%;
  background-color: #EEEEEE;
}

.login-col {
  display: flex;
  justify-content: flex-end;
}

.logo-col {
  display: flex;
  align-items: center;
}

.login-card {
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 10px 20px rgba(28, 101, 140, 0.2);
  background-color: #FFFFFF;
}

.login-title {
  margin-bottom: 32px;
  color: #667085;
}

.login-text-field {
  border-radius: 4px;
  --v-text-field-outlined-border-color: #DADCE0;
}

.login-btn {
  width: 100%;
  background-color: #1C658C;
  color: #FFFFFF;
}

.create-account-btn {
  width: 100%;
  background-color: #FFFFFF;
  color: #1C658C;
  border-radius: 4px;
}
</style>
