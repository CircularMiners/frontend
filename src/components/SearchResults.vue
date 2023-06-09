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

const userStore = useUserStore()

// const router = useRouter()
const dialog = ref(false)
const confirmationDialog = ref(false)
const requestMessage = ref('')
let dialogSideStream: any

// Function to open the dialog
const openDialog = function (sidestream: any): void {
  dialogSideStream = sidestream
  dialog.value = true
  confirmationDialog.value = false
}

// Function to send the access request
const sendRequest = async function (): Promise<void> {
  dialog.value = false

  const requestData: requestData = {
    dataRequestorId: userStore.user?.id, // Replace with function to get ID
    sideStreamId: dialogSideStream.id,
    requestAccessMessage: requestMessage.value,
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

// Function to get the requestStatus

const getRequestStatusColor = (requestStatus: string) => {
  if (requestStatus === 'OPEN')
    return 'green'

  else if (requestStatus === 'CLOSED')
    return 'red'

  else
    return 'yellow'
}

const getButtonName = (requestStatus: string) => {
  if (requestStatus === 'OPEN')
    return 'Open Access'

  else if (requestStatus === 'CLOSED')
    return 'Request Access'

  else
    return 'Pending Request'
}

// open access page
// const openAccessPage = function (sideStreamId: string, dataRequestorId: string): void {
//   router.push({ path: `Results/${sideStreamId}/${dataRequestorId}`, params: { sideStream: sideStreamId } })
// }

// open access page new
const openAccessPage = function (sideStreamId: string, dataRequestorId: string): void {
  window.open(`/search/Results/${sideStreamId}/${dataRequestorId}`, '_blank')
}
</script>

<template>
  <div>
    <div v-if="props.filteredResults.length > 0">
      <v-card v-for="(sidestream, index) in props.filteredResults" :key="index" mb="6">
        <v-card-title>{{ sidestream.companyName }} </v-card-title>
        <v-card-text>
          <p><b>Mine Name:</b> {{ sidestream.mineName }}</p>
          <p><b>Mine Location:</b> {{ sidestream.mineLocation }}</p>
          <p><b>Material:</b></p>
          <p>
            <span style="padding-left: 6rem;">Material Name: {{ sidestream.meterialName }}</span><br>
            <span style="padding-left: 6rem;">Material Size: {{ sidestream.size }}</span><br>
            <span style="padding-left: 6rem;">Material Weight: {{ sidestream.weight }}</span><br>
            <span style="padding-left: 6rem;">MaterialDescription: {{ sidestream.meterialDescription }}</span>
          </p>
        </v-card-text>
        <v-layout justify-end align-start mb="3" mr="3">
          <v-btn
            :color="getRequestStatusColor(sidestream.requestStatus)"
            variant="tonal"
            class="text-subtitle-2"
            @click="sidestream.requestStatus === 'OPEN' ? openAccessPage(sidestream.id, '449cb02f-df1d-4982-87ea-2230815b75f1') : openDialog(sidestream)"
          >
            {{ getButtonName(sidestream.requestStatus) }}
          </v-btn>
        </v-layout>
        <v-dialog v-model="dialog" persistent width="auto">
          <v-card>
            <v-card-title style="text-align:center; font-weight:bold; font-size:x-large; margin-top: 20px;">
              Request access for {{ sidestream.companyName }}
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
