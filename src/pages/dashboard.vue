<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'DashboardPage',
  setup() {
    const router = useRouter()

    const registerMine = () => {
      router.push('/MineRegister')
    }

    const uploadMineInfo = () => {
      router.push('/MineralData')
    }

    return {
      registerMine,
      uploadMineInfo,
    }
  },
})
</script>

<template>
  <v-container fluid>
    <v-row justify="start">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-5" color="primary">
          <v-card-title class="white--text mb-2">
            Mine Management Dashboard
          </v-card-title>
          <v-btn class="mr-3" color="secondary" to="/MineRegister">
            Register Mine
          </v-btn>
          <v-btn class="mr-3" color="secondary" @click="uploadMineInfo()">
            Upload Mine Information
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
