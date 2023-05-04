<script>
import { ref } from 'vue'

export default {
  name: 'MineRegistration',
  setup() {
    const mineId = ref('')
    const mineName = ref('')
    const mineLocation = ref('')
    const mineDescription = ref('')

    // function register() {
    //   // TODO: Implement registration functionality
    // }

    return {
      mineId,
      mineName,
      mineLocation,
      mineDescription,

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
            <h2>Register the Mine</h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="register">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field v-model="mineId" label="Mine ID" class="registration-text-field" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="mineName" label="Mine Name" class="registration-text-field" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field v-model="mineLocation" label="Mine Location" class="registration-text-field" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="mineDescription" label="Mine Description" class="registration-text-field" />
                </v-col>
              </v-row>
            </v-form>
            <div class="registration-separator">
              <router-link to="/MineRepresentative">
                <v-btn color="#1C658C" text class="registration-btn">
                  Register
                </v-btn>
              </router-link>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
