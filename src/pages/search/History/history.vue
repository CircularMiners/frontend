<script lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'

interface Request {
  dataRequestorId: string
  requestAccessDatetime: string
  requestAccessStatus: string
  sidestreamId: string
  sidestreamName: string
  sidestreamDescription: string
}

const axiosClient = axios.create({
  baseURL: 'https://urchin-app-q36en.ondigitalocean.app/backend2',
})

export default {
  setup() {
    const messages = ref<Request[]>([])

    const loadMessages = async () => {
      try {
        const response = await axiosClient.get('/requestaccess/requestor/21734667-7a32-45f4-97aa-accffc62066d') // change to get the ID
        messages.value = response.data
      }
      catch (error) {
        console.error(error)
      }
    }

    onMounted(loadMessages)

    return {
      messages,
    }
  },
}
</script>

<template>
  <div class="history">
    <v-card>
      <v-card-title style="text-align:center; font-weight:bold; font-size: xx-large; margin-top: 20px;">
        Request History
      </v-card-title>
      <v-table>
        <thead>
          <tr>
            <th>Sidestream Name</th>
            <th>Date</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(request, index) in messages" :key="index">
            <td>{{ request.sidestreamName }}</td>
            <td>{{ request.requestAccessDatetime }}</td>
            <td>{{ request.sidestreamDescription }}</td>
            <td>
              <v-btn
                :color="request.requestAccessStatus === 'PENDING' ? 'yellow' : request.requestAccessStatus === 'APPROVED' ? 'green' : 'red'"
                outlined
                :disabled="request.requestAccessStatus === 'PENDING'"
              >
                {{ request.requestAccessStatus }}
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </div>
</template>
