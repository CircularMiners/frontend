<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

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

const messages = ref<Request[]>([])

const userStore = useUserStore()

const loadMessages = async () => {
  const response = await axiosClient.get(`/requestaccess/requestor/${userStore.user?.id}`) // change to get the dataRequestorId
  messages.value = response.data
}

onMounted(loadMessages)

const router = useRouter()

const navigateToDetails = (dataRequestorId: string, sidestreamId: string) => {
  router.push(`/search/results/${dataRequestorId}/${sidestreamId}`)
}
</script>

<template>
  <div class="history">
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
              :disabled="request.requestAccessStatus !== 'APPROVED'"
              @click="navigateToDetails(request.dataRequestorId, request.sidestreamId)"
            >
              {{ request.requestAccessStatus }}
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<route lang="yaml">
meta:
  requiresAuth: true
</route>
