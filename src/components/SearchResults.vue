<script>
const { mockData } = useCompanyMockDataStore()

export default {
  props: {
    searchTerm: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      noResultsText: 'No results found for',
      testOverlay: false,
    }
  },
  computed: {
    filteredResults() {
      if (!this.searchTerm) {
        return [] // return an empty object as the first value
      }
      else {
        return mockData.filter((data) => {
          return (
            data.companyName.toLowerCase().includes(this.searchTerm.toLowerCase())
          || data.location.toLowerCase().includes(this.searchTerm.toLowerCase())
          || data.mineralName.toLowerCase().includes(this.searchTerm.toLowerCase())
          || data.materialName.toLowerCase().includes(this.searchTerm.toLowerCase())
          )
        })
      }
    },
    filteredResultsByCompanyId() {
      if (!this.companyId) {
        return []
      }
      else {
        return mockData.filter((data) => {
          return (
            data.id === this.companyId
          )
        })
      }
    },
  },
  watch: {
    testOverlay(val) {
      val && setTimeout(() => {
        this.testOverlay = false
      }, 2000)
    },
  },
  methods: {
    openOverlayForm(companyId) {
      this.$router.push({ path: `Request/${companyId}`, params: { company: companyId } })
    },
    openAccessPage(companyId) {
      this.$router.push({ path: `Results/${companyId}`, params: { company: companyId } })
    },
  },
}
</script>

<template>
  <div>
    <div v-if="filteredResults.length > 0">
      <v-card v-for="(company, index) in filteredResults" :key="index" mb="6">
        <v-card-title>{{ company.companyName }} </v-card-title>
        <v-card-text>
          <p><b>Company Name:</b> {{ company.companyName }}</p>
          <p><b>Location:</b> {{ company.location }}</p>
          <p><b>Material:</b></p>
          <p>
            <span style="padding-left: 6rem;">Material Name: {{ company.materialName }}</span><br>
            <span style="padding-left: 6rem;">Particle Size: {{ company.particleSize }}</span><br>
            <span style="padding-left: 6rem;">Particle Weight: {{ company.particleWeight }}</span>
          </p>
          <p><b>Minerals:</b></p>
          <p>
            <span style="padding-left: 6rem;">Mineral Name: {{ company.mineralName }}</span><br>
            <span style="padding-left: 6rem;">Percentage: {{ company.percentage }}</span><br>
            <span style="padding-left: 6rem;">Chemical Code: {{ company.chemicalCode }}</span><br>
            <span style="padding-left: 6rem;">Purity %: {{ company.purity }}</span><br>
            <span style="padding-left: 6rem;">Moisture %: {{ company.moisture }}</span>
          </p>
        </v-card-text>
        <v-layout justify-end align-start mb="3" mr="3">
          <v-btn :color="company.access ? 'green' : 'red'" variant="tonal" class="text-subtitle-2" @click="company.access ? openAccessPage(company.id) : testOverlay = !overlay">
            {{ company.access ? 'Open Access' : 'Request Access' }}
          </v-btn>
        </v-layout>
      </v-card>

      <v-overlay
        v-model="testOverlay"
        contained
        class="align-center justify-center"
      >
        <v-btn
          color="success"
          @click="overlay = false"
        >
          Hide Overlay
        </v-btn>
      </v-overlay>
    </div>
    <p v-if="searchTerm && filteredResults.length === 0">
      {{ noResultsText }} "{{ searchTerm }}"
    </p>
  </div>
</template>
