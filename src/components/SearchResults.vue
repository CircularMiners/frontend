<script setup lang="ts">
import type { requestData } from '~/interfaces/requestData.interface'
import { sendAccessRequest } from '~/services/request.api.ts'

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
const requestAccessMessage = ref('')
let requestSideStream: any

// console.log('formSearchResult'+props.filteredResults)

const openAccessPage = function (sideStreamId: string): void {
  router.push({ path: `Results/${sideStreamId}`, params: { sideStream: sideStreamId } })
}
const openDialog = function (sideStreamId: string): void {
  requestSideStream = props.filteredResults.find((companySideStreamData: any) => companySideStreamData.id === sideStreamId)
  dialog.value = true
  confirmationDialog.value = false
}
const sendRequest = async function (): Promise<void> {
  dialog.value = false

  const requestData: requestData = {
    dataRequestorId: '21734667-7a32-45f4-97aa-accffc62066d', // Replace with function to get ID
    sideStreamId: requestSideStream.id,
    requestAccessMessage: requestAccessMessage.value,
  }
  try {
    await sendAccessRequest(requestData)
    confirmationDialog.value = true
  }
  catch (err) {
    console.error(err)
    // Handle error
  }
}
</script>

<template>
  <div>
    <div v-if="props.filteredResults.length > 0">
      <v-card v-for="(sideStream, index) in props.filteredResults" :key="index" mb="6">
        <v-card-title>{{ sideStream.companyName }} </v-card-title>
        <v-card-text>
          <p><b>Mine Name:</b> {{ sideStream.mineName }}</p>
          <p><b>Mine Location:</b> {{ sideStream.mineLocation }}</p>
          <p><b>Material:</b></p>
          <p>
            <span style="padding-left: 6rem;">Material Name: {{ sideStream.meterialName }}</span><br>
            <span style="padding-left: 6rem;">Material Size: {{ sideStream.size }}</span><br>
            <span style="padding-left: 6rem;">Material Weight: {{ sideStream.weight }}</span><br>
            <span style="padding-left: 6rem;">MaterialDescription: {{ sideStream.meterialDescription }}</span>
          </p>
        </v-card-text>
        <v-layout justify-end align-start mb="3" mr="3">
          <v-btn :color="sideStream.access ? 'green' : 'red'" variant="tonal" class="text-subtitle-2" @click="sideStream.access ? openAccessPage(sideStream.id) : openDialog(sideStream.id)">
            {{ sideStream.access ? 'Open Access' : 'Request Access' }}
          </v-btn>
        </v-layout>
        <v-dialog v-model="dialog" persistent width="auto">
          <v-card>
            <v-card-title style="text-align:center; font-weight:bold; font-size:x-large; margin-top: 20px;">
              Request access for {{ requestSideStream.companyName }}
            </v-card-title>
            <v-card-text>
              Write a message to the company. The request will be added to your request history.
            </v-card-text>
            <v-col cols="12">
              <v-textarea v-model="requestAccessMessage" label="Message" required />
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
