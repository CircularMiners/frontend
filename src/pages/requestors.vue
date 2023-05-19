<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://urchin-app-q36en.ondigitalocean.app/backend2',
})

interface RequestData {
  dataRequestorName: string
  dataRequestorEmail: string
  dataRequestorCompanyName: string
  requestAccessMessage: string
  requestAccessDatetime: string
  requestAccessStatus: string
}

const pendingRequests = ref<RequestData[]>([])
const historyRequests = ref<RequestData[]>([])
const detailsDialog = ref(false)
const selectedRequest = ref<RequestData | null>(null)

onMounted(() => {
  fetchRequests()
})

function showDetailsDialog(request: any) {
  selectedRequest.value = request
  detailsDialog.value = true
}

async function fetchRequests() {
  try {
    const response = await axiosClient.get<RequestData[]>('/requestaccess/miner/1782bc72-7188-453f-acac-f3f0c73f2c35')
    pendingRequests.value = response.data.filter(request => request.requestAccessStatus === 'PENDING')
    historyRequests.value = response.data.filter(request => request.requestAccessStatus !== 'PENDING')
  }
  catch (error) {
    console.error('Failed to fetch requests:', error)
  }
}

function approveRequest() {
  // Handle request approval logic here
  detailsDialog.value = false
}

function denyRequest() {
  // Handle request denial logic here
  detailsDialog.value = false
}

function cancelRequest() {
  // Handle request cancellation logic here
  detailsDialog.value = false
}

function getStatusColor(status: string) {
  if (status === 'PENDING')
    return 'yellow'
  else if (status === 'APPROVED')
    return 'green'
  else
    return 'red'
}
</script>

<template>
  <div>
    <v-card>
      <v-card-title style="text-align:center; font-weight:bold; font-size: xx-large; margin-top: 20px;">
        Pending Requests
      </v-card-title>
      <v-table>
        <tr>
          <th>Full Name</th>
          <th>Email</th>
          <th>Company Name</th>
          <th>Message</th>
          <th>Date</th>
          <th>Details</th>
        </tr>
        <template v-for="request in pendingRequests" :key="request.dataRequestorId">
          <tr>
            <td>{{ request.dataRequestorName }}</td>
            <td>{{ request.dataRequestorEmail }}</td>
            <td>{{ request.dataRequestorCompanyName }}</td>
            <td>{{ request.requestAccessMessage }}</td>
            <td>{{ request.requestAccessDatetime }}</td>
            <td>
              <v-btn
                :color="getStatusColor(request.requestAccessStatus)"
                outlined
                :disabled="request.requestAccessStatus !== 'PENDING'"
                @click="showDetailsDialog(request)"
              >
                Details
              </v-btn>
            </td>
          </tr>
        </template>
      </v-table>
    </v-card>

    <v-card>
      <v-card-title style="text-align:center; font-weight:bold; font-size: xx-large; margin-top: 20px;">
        History
      </v-card-title>
      <v-table>
        <tr>
          <th>Full Name</th>
          <th>Email</th>
          <th>Company Name</th>
          <th>Message</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
        <template v-for="request in historyRequests" :key="request.dataRequestorId">
          <tr>
            <td>{{ request.dataRequestorName }}</td>
            <td>{{ request.dataRequestorEmail }}</td>
            <td>{{ request.dataRequestorCompanyName }}</td>
            <td>{{ request.requestAccessMessage }}</td>
            <td>{{ request.requestAccessDatetime }}</td>
            <td>{{ request.requestAccessStatus }}</td>
          </tr>
        </template>
      </v-table>
    </v-card>

    <!-- Details dialog -->
    <v-dialog v-model="detailsDialog" max-width="500px">
      <v-card>
        <v-card-title>Request Details</v-card-title>
        <v-card-text>
          <!-- Display request details here -->
          <div v-if="selectedRequest">
            <p><strong>Full Name:</strong> {{ selectedRequest.dataRequestorName }}</p>
            <p><strong>Email:</strong> {{ selectedRequest.dataRequestorEmail }}</p>
            <p><strong>Company Name:</strong> {{ selectedRequest.dataRequestorCompanyName }}</p>
            <p><strong>Message:</strong> {{ selectedRequest.requestAccessMessage }}</p>
            <p><strong>Date:</strong> {{ selectedRequest.requestAccessDatetime }}</p>
            <p><strong>Status:</strong> {{ selectedRequest.requestAccessStatus }}</p>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="green" @click="approveRequest">
            Approve
          </v-btn>
          <v-btn color="red" @click="denyRequest">
            Deny
          </v-btn>
          <v-btn color="blue" @click="cancelRequest">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
