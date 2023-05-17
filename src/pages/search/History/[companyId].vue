<script lang="ts">
export default {
  props: ['companyId'],
  setup(props) {
    const { mockData } = useCompanyMockDataStore()

    const company = computed(() => {
      return mockData.find((data: { id: number }) => data.id === Number(props.companyId))
    })

    const companyName = computed(() => {
      return company.value ? company.value.companyName : ''
    })

    // create a ref for storing the list of messages
    const messages = ref([])

    // load the messages when the component is mounted
    const loadMessages = async () => {
      try {
        const response = await fetch(`/api/company/${props.companyId}/requests`)
        const data = await response.json()
        messages.value = data.requests
      }
      catch (error) {
        console.error(error)
      }
    }

    // call the loadMessages function when the component is mounted
    loadMessages()

    return {
      companyName,
      messages, // add the messages ref to the returned object
    }
  },
}
</script>

<template>
  <div class="history">
    <v-card>
      <v-card-title
        style="text-align:center; font-weight:bold; font-size: xx-large; margin-top: 20px;"
      >
        Request History
      </v-card-title>
      <v-table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Date</th>
            <th>Message</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(request, index) in messages" :key="index">
            <!-- use the request object to display the message details -->
            <td>{{ companyName }}</td>
            <td>{{ request.date }}</td>
            <td>{{ request.message }}</td>
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
          <tr>
            <td>{{ companyName }}</td>
            <td>{{ '2023-05-07' }}</td> <!-- replace with the actual date -->
            <td>{{ 'This is an example message.' }}</td> <!-- replace with the actual message -->
            <td>
              <v-btn
                variant="tonal" class="text-subtitle-2"
                color="yellow"
              >
                Pending
              </v-btn>
            </td>
          </tr>
          <tr>
            <td>{{ companyName }}</td>
            <td>{{ '2023-05-07' }}</td> <!-- replace with the actual date -->
            <td>{{ 'This is an example message.' }}</td> <!-- replace with the actual message -->
            <td>
              <v-btn
                variant="tonal" class="text-subtitle-2"
                color="red"
              >
                Rejected
              </v-btn>
            </td>
          </tr>
          <tr>
            <td>{{ companyName }}</td>
            <td>{{ '2023-05-07' }}</td> <!-- replace with the actual date -->
            <td>{{ 'This is an example message.' }}</td> <!-- replace with the actual message -->
            <td>
              <v-btn
                variant="tonal" class="text-subtitle-2"
                color="green"
              >
                Approved
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </div>
</template>
