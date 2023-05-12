<script setup lang="ts">
const props = defineProps({
  searchTerm: {
    type: String,
    required: true,
    default: '',
  },
  filteredResults: {
    type: Array,
    required: true,
  },
})
const router = useRouter()
const dialog = ref(false)
const confirmationDialog = ref(false)
const requestMessage = ref('')

// console.log('formSearchResult'+props.filteredResults)

const openAccessPage = function (companyId: number): void {
  router.push({ path: `Results/${companyId}`, params: { company: companyId } })
}
const openDialog = function (companyId: number): void {
  requestCompany = useCompanyMockDataStore().mockData.find(data => data.id === companyId)
  dialog.value = true
  confirmationDialog.value = false
}
const sendRequest = function (): void {
  dialog.value = false
  confirmationDialog.value = true
}
</script>

<template>
  <div>
    <div v-if="props.filteredResults.length > 0">
      <v-card v-for="(company, index) in props.filteredResults" :key="index" mb="6">
        <v-card-title>{{ company.companyName }} </v-card-title>
        <v-card-text>
          <p><b>Mine Name:</b> {{ company.mineName }}</p>
          <p><b>Mine Location:</b> {{ company.mineLocation }}</p>
          <p><b>Material:</b></p>
          <p>
            <span style="padding-left: 6rem;">Material Name: {{ company.meterialName }}</span><br>
            <span style="padding-left: 6rem;">Material Size: {{ company.size }}</span><br>
            <span style="padding-left: 6rem;">Material Weight: {{ company.weight }}</span><br>
            <span style="padding-left: 6rem;">MaterialDescription: {{ company.meterialDescription }}</span>
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
              <WhiteButton button-name="OK" variant="flat" @click="confirmationDialog = false" />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </div>
  </div>
</template>
