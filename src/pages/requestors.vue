<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://urchin-app-q36en.ondigitalocean.app/backend2',
})

interface RequestData {
  dataRequestorId: string
  dataRequestorName: string
  dataRequestorEmail: string
  dataRequestorCompanyName: string
  requestAccessMessage: string
  requestAccessDatetime: string
  requestAccessStatus: string
  sidestreamId: string
}

function formatDate(date: string): string {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString(undefined, options)
}

const pendingRequests = ref<RequestData[]>([])
const historyRequests = ref<RequestData[]>([])
const detailsDialog = ref(false)
const selectedRequest = ref<RequestData | null>(null)
const mineRepId = '1782bc72-7188-453f-acac-f3f0c73f2c35' // Replace with your actual mineRepId

onMounted(() => {
  fetchRequests(mineRepId)
})

function showDetailsDialog(request: RequestData) {
  selectedRequest.value = request
  detailsDialog.value = true
}

async function fetchRequests(mineRepId: string) {
  try {
    const response = await axiosClient.get<RequestData[]>(`/requestaccess/miner/${mineRepId}`)
    pendingRequests.value = response.data.filter(request => request.requestAccessStatus === 'PENDING')
    historyRequests.value = response.data.filter(request => request.requestAccessStatus !== 'PENDING')
  }
  catch (error) {
    console.error(error)
  }
}

async function approveRequest() {
  const selectedRequestValue = selectedRequest.value
  if (selectedRequestValue) {
    const { dataRequestorId, sidestreamId } = selectedRequestValue
    const payload = {
      dataRequestorId,
      requestAccessStatus: 'APPROVED',
      sidestreamId,
    }

    try {
      await axiosClient.put(`/requestaccess/${mineRepId}`, payload)
      detailsDialog.value = false
      // Perform any additional actions after request approval
    }
    catch (error) {
      console.error(error)
    }
  }
}

async function denyRequest() {
  const selectedRequestValue = selectedRequest.value
  if (selectedRequestValue) {
    const { dataRequestorId, sidestreamId } = selectedRequestValue
    const payload = {
      dataRequestorId,
      requestAccessStatus: 'DENIED',
      sidestreamId,
    }

    try {
      await axiosClient.put(`/requestaccess/${mineRepId}`, payload)
      detailsDialog.value = false
      // Perform any additional actions after request denial
    }
    catch (error) {
      console.error(error)
    }
  }
}

function cancelRequest() {
  detailsDialog.value = false
}
</script>

<template>
  <div>
    <v-card>
      <v-card-title style="text-align:center; font-weight:bold; font-size: xx-large; margin-top: 20px;">
        Pending Requests
      </v-card-title>
      <v-table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Company Name</th>
            <th>Message</th>
            <th>Date</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in pendingRequests" :key="request.dataRequestorId" style="margin-bottom: 10px;">
            <td>{{ request.dataRequestorName }}</td>
            <td>{{ request.dataRequestorEmail }}</td>
            <td>{{ request.dataRequestorCompanyName }}</td>
            <td>{{ request.requestAccessMessage }}</td>
            <td>{{ formatDate(request.requestAccessDatetime) }}</td>
            <td>
              <v-btn
                color="blue"
                variant="tonal" class="text-subtitle-2"
                outlined
                @click="showDetailsDialog(request)"
              >
                Details
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <v-card>
      <v-card-title style="text-align:center; font-weight:bold; font-size: xx-large; margin-top: 20px;">
        History of requests
      </v-card-title>
      <v-table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Company Name</th>
            <th>Message</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in historyRequests" :key="request.dataRequestorId" style="margin-bottom: 10px;">
            <td>{{ request.dataRequestorName }}</td>
            <td>{{ request.dataRequestorEmail }}</td>
            <td>{{ request.dataRequestorCompanyName }}</td>
            <td>{{ request.requestAccessMessage }}</td>
            <td>{{ formatDate(request.requestAccessDatetime) }}</td>
            <td>{{ request.requestAccessStatus }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <!-- Details dialog -->
    <v-dialog v-model="detailsDialog" max-width="500px">
      <v-card>
        <v-card-actions class="pa-3">
          <v-spacer />
          <v-btn icon @click="cancelRequest">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-title style="text-align:center;">
          Request Details
        </v-card-title>
        <v-card-text>
          <!-- Display request details here -->
          <div v-if="selectedRequest">
            <p><strong>Full Name:</strong> {{ selectedRequest.dataRequestorName }}</p>
            <p><strong>Email:</strong> {{ selectedRequest.dataRequestorEmail }}</p>
            <p><strong>Company Name:</strong> {{ selectedRequest.dataRequestorCompanyName }}</p>
            <p><strong>Message:</strong> {{ selectedRequest.requestAccessMessage }}</p>
            <p><strong>Date:</strong> {{ formatDate (selectedRequest.requestAccessDatetime) }}</p>
            <p><strong>Status:</strong> {{ selectedRequest.requestAccessStatus }}</p>
          </div>
        </v-card-text>
        <v-card-actions justify-center>
          <v-btn variant="tonal" class="text-subtitle-2" color="green" outlined @click="approveRequest">
            Approve
          </v-btn>
          <v-spacer />
          <v-btn variant="tonal" class="text-subtitle-2" color="red" @click="denyRequest">
            Deny
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
