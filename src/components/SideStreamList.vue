<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      sidestreams: [] as any[],
    }
  },
  mounted() {
    this.fetchSidestreams(mineRepId, mineId)
  },
  methods: {
    async fetchSidestreams(mineRepId: string, mineId: string) {
      try {
        const url = `https://urchin-app-q36en.ondigitalocean.app/backend2/sidestream/${mineRepId}/${mineId}`
        const response = await axios.get(url)
        this.sidestreams = response.data
      }
      catch (error) {
        console.error(error)
        // Handle the error
      }
    },
  },
})
</script>

<template>
  <v-container>
    <h1>Mine Sidestreams</h1>
    <v-card v-for="sidestream in sidestreams" :key="sidestream.id" outlined>
      <v-card-title>
        <span class="headline">{{ sidestream.oreName }}</span>
      </v-card-title>
      <v-card-text>
        <div>Weight: {{ sidestream.weight }}</div>
        <div>Size: {{ sidestream.size }}</div>
        <div>Description: {{ sidestream.SidestreamDescription }}</div>
        <div v-if="sidestream.mineralName">
          Mineral Name: {{ sidestream.mineralName }}
        </div>
        <div v-if="sidestream.mineralFormula">
          Mineral Formula: {{ sidestream.mineralFormula }}
        </div>
        <div v-if="sidestream.mineralPercentage">
          Mineral Percentage: {{ sidestream.mineralPercentage }}
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>
