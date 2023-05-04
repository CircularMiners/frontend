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
  <v-container fluid class="logo-container">
    <v-row justify="center" align="center" style="height: 100%" class="align-self-center">
      <v-col cols="12" md="6" class="d-flex justify-center align-center">
        <div class="logo-text">
          <img src="../../assets/MineMatchLogo.png" alt="Logo" class="logo">
          <p class="text">
            MineMatch is a platform designed to promote a greener and more sustainable mining industry by providing a marketplace for the sale of mine side stream and tailings to potential buyers. By connecting mining companies with interested parties, MineMatch facilitates the reduction of waste and promotes the circular economy by enabling the reuse of materials that might otherwise be discarded. Our goal is to make the mining industry more sustainable while simultaneously supporting businesses and communities that rely on it.
          </p>
        </div>
      </v-col>
      <v-col cols="12" sm="8" md="6" lg="4" class="align-items-center">
        <v-card class="login-card">
          <v-card-title class="text-center login-title">
            <h2 class="mb-0">
              Login
            </h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-radio-group
                inline
              >
                <v-radio
                  label="Representative"
                  value="radio-1"
                />
                <v-radio
                  label="Vendor"
                  value="radio-2"
                />
              </v-radio-group>
              <v-text-field v-model="email" label="Email" placeholder="Your email" class="login-text-field" :rules="[rules.required, rules.email]" outlined />
              <v-text-field v-model="password" label="Password" placeholder="Your password" type="password" class="login-text-field" :rules="[rules.required]" outlined />
              <v-btn type="submit" color="#1C658C" class="mt-4 login-btn" block>
                Login
              </v-btn>
            </v-form>
            <p class="register-text">
              Don't have an account? Register now.
            </p>
            <v-row>
              <v-col>
                <router-link to="/RegistrationRepresentatives">
                  <v-btn type="submit" color="#1C658C" class="mt-4 register-btn-rep" block>
                    Representative
                  </v-btn>
                </router-link>
              </v-col>
              <v-col>
                <router-link to="/RegistrationVendors">
                  <v-btn type="submit" color="#1C658C" class="mt-4 register-btn-vendor" block>
                    Vendor
                  </v-btn>
                </router-link>
              </v-col>
            </v-row>
            <v-divider class="my-4" />
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
  border-radius: 2px;
}

.p {
  margin-bottom: 0;
}
</style>
