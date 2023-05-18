<script setup lang="ts">
</script>

<template>
  <div>
    <v-card>
      <v-card-title
        style="text-align:center; font-weight:bold; font-size: xx-large; margin-top: 20px;"
      >
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
          <tr v-for="(request, index) in messages" :key="index">
            <!-- use the request object to display the message details -->
            <td>{{ request.fullName }}</td>
            <td>{{ request.email }}</td>
            <td>{{ request.companyName }}</td>
            <td>{{ request.message }}</td>
            <td>{{ request.date }}</td>
            <td>
              <v-btn
                :color="request.status === 'Pending' ? 'yellow' : request.status === 'Approved' ? 'green' : 'red'"
                outlined
                :disabled="request.status === 'Pending'"
              >
                {{ request.status }}
              </v-btn>
            </td>
          </tr>
          <!-- example request -->
        </tbody>
      </v-table>
    </v-card>
    <v-card>
      <v-card-title
        style="text-align:center; font-weight:bold; font-size: xx-large; margin-top: 20px;"
      >
        Requests History
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
      </v-table>
    </v-card>
  </div>
</template>
