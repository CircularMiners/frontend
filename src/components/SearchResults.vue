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
      buttonText: 'Request Access',
      isButtonActive: false,
      noResultsText: 'No results found for',
      showOverlayForm: false,
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
  methods: {
    openOverlayForm(companyId) {
      this.showOverlayForm = true
      this.companyId = companyId
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
          <v-btn :color="company.access ? 'green' : 'red'" @click="company.access ? openAccessPage(company.id) : showOverlayForm(company.id)">
            {{ company.access ? 'Open Access' : 'Request Access' }}
          </v-btn>
        </v-layout>
      </v-card>
    </div>
    <p v-if="searchTerm && filteredResults.length === 0">
      {{ noResultsText }} "{{ searchTerm }}"
    </p>
    <OverlayForm v-if="showOverlayForm" @close-overlay="showOverlayForm = false">
      Overlay
    </OverlayForm>
  </div>
</template>
