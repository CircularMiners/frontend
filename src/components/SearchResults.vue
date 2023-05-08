<script>
const { mockData } = useCompanyMockDataStore()

export default {
  props: {
    searchButtonStatus: {
      type: Boolean,
      required: true,
    },
    searchTerm: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      noResultsText: 'No results found for',
      dialog: false,
      confirmationDialog: false,
      requestMessage: '',
    }
  },
  computed: {
    filteredResults() {
      if (this.searchButtonStatus === true) {
        if (this.searchButtonStatus && !this.searchTerm) {
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
      }
      else {
        return []
      }
    },
    filteredResultsByCompanyId() {
      if (this.searchButtonStatus === true) {
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
      }
      else {
        return []
      }
    },
  },
  methods: {
    openAccessPage(companyId) {
      this.$router.push({ path: `Results/${companyId}`, params: { company: companyId } })
    },
    openDialog(companyId) {
      this.requestCompany = useCompanyMockDataStore().mockData.find(data => data.id === companyId)
      this.dialog = true
      this.confirmationDialog = false
    },
    sendRequest() {
      // implement sending request
      this.dialog = false
      this.confirmationDialog = true
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
            <span style="padding-left: 6rem;">Particle Weight: {{ company.particleWeight }}</span><br>
            <span style="padding-left: 6rem;">Description: {{ company.materialDescription }}</span>
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
          <v-btn :color="company.access ? 'green' : 'red'" variant="tonal" class="text-subtitle-2" @click="company.access ? openAccessPage(company.id) : openDialog(company.id)">
            {{ company.access ? 'Open Access' : 'Request Access' }}
          </v-btn>
        </v-layout>
        <v-dialog v-model="dialog" persistent width="auto">
          <v-card>
            <v-card-title style="text-align:center; font-weight:bold; font-size:x-large; margin-top: 20px;">
              Request access for {{ requestCompany.companyName }}
            </v-card-title>
            <v-card-text>
              Write a message to the company. The request will be added to your request history.
            </v-card-text>
            <v-col cols="12">
              <v-textarea v-model="requestMessage" label="Message" required />
            </v-col>
            <v-card-actions style="justify-content: center;">
              <WhiteButton button-name="Cancel" variant="text" @click="dialog = false" />
              <v-spacer />
              <WhiteButton button-name="Send" variant="flat" @click="sendRequest" />
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="confirmationDialog" persistent max-width="400">
          <v-card>
            <v-card-title class="text-center">
              <v-icon color="green-darken-3" size="64">
                mdi-check-circle-outline
              </v-icon>
              <div style="font-size: 24px; font-weight: bold;">
                Your request has been sent!
              </div>
            </v-card-title>
            <v-card-actions style="justify-content: center;">
              <WhiteButton
                v-card-actions button-name="OK" variant="flat" @click="confirmationDialog = false"
              />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </div>
    <p v-if="searchTerm && filteredResults.length === 0">
      {{ noResultsText }} "{{ searchTerm }}"
    </p>
  </div>
</template>
