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

    const requests = computed(async () => {
      try {
        const response = await fetch(`/api/company/${props.companyId}/requests`)
        const data = await response.json()
        return data.requests
      }
      catch (error) {
        console.error(error)
        return []
      }
    })

    return {
      companyName,
      requests,
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
          <tr v-for="request in requests" :key="request.id">
            <td>{{ companyName }}</td>
            <td>{{ request.date }}</td>
            <td>{{ request.message }}</td>
            <td>{{ request.status }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </div>
</template>
