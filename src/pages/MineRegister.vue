<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  name: 'MineRegistration',
  setup() {
    // const mineId = ref('')
    const mineName = ref('')
    const mineLocation = ref('')
    const mineDescription = ref('')

    async function register() {
      const { userId } = useUserStore()
      const data = {
        // mineId: mineId.value,
        mineName: mineName.value,
        mineLocation: mineLocation.value,
        mineDescription: mineDescription.value,
      }

      try {
        const response = await axios.post('/mine/addmine', data)
        // eslint-disable-next-line no-console
        console.log(response.data)
        // eslint-disable-next-line no-const-assign, unused-imports/no-unused-vars
        userId = response.data.mine_representative_id
        // TODO: Handle successful registration
      }
      catch (error) {
        console.error(error)
        // TODO: Handle registration error
      }
    }

    return {
      // mineId,
      mineName,
      mineLocation,
      mineDescription,
      userId,
      register,
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
                <!-- <v-col cols="12" md="6">
                  <v-text-field v-model="mineId" label="Mine ID" class="registration-text-field" />
                </v-col> -->
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
                <v-btn color="#1C658C" text class="registration-btn" @click="register">
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
