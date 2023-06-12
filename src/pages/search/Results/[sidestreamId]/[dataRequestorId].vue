<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://urchin-app-q36en.ondigitalocean.app/backend2',
})

const headers = [
  { label: 'Material Name', value: 'materialName' },
  { label: 'Weight', value: 'weight' },
  { label: 'Size', value: 'size' },
  { label: 'Material Description', value: 'materialDescription' },
  { label: 'Mineral Name', value: 'mineralName' },
  { label: 'Mineral Formula', value: 'mineralFormula' },
  { label: 'Mineral Percentage', value: 'mineralPercentage' },
]

interface Company {
  companyName: string
  mineName: string
  mineLocation: string
  mineDescription: string
  sidestreamId: string
  materialName: string
  weight: string
  size: string
  materialDescription: string
  mineralName: string
  mineralFormula: string
  mineralPercentage: string
}

const company = ref<Company | null>(null) // Initialize with null

const fetchData = async () => {
  const response = await axiosClient.get('/sidestream/requestor/449cb02f-df1d-4982-87ea-2230815b75f1/edf792ec-41dc-4924-a60e-0e5c42ed4b4d')
  if (response.data.length > 0) {
    company.value = response.data[0]
  }
  else {
    // Handle the case when no data is returned
    company.value = null
  }
}

onMounted(fetchData)

const transformedItems = computed(() => {
  if (company.value) {
    return [
      {
        materialName: company.value.materialName,
        particleWeight: company.value.weight,
        particleSize: company.value.size,
        materialDescription: company.value.materialDescription,
        mineralName: company.value.mineralName,
        mineralPercentage: company.value.mineralPercentage,
        mineralFormula: company.value.mineralFormula,
      },
    ].map((item) => {
      const transformedItem: any = {}
      for (const header of headers)
        transformedItem[header.value] = item[header.value] || 'No Data'

      return transformedItem
    })
  }
  else {
    return []
  }
})
</script>

<template>
  <div>
    <v-card v-if="company" class="mb-6">
      <v-card-title style="text-align:center; font-weight:bold; font-size: xx-large; margin-top: 20px;">
        Results for {{ company.companyName }}
      </v-card-title>
      <v-card-text style="font-size: medium;">
        <strong>Mine Name:</strong> {{ company.mineName }} <br>
        <strong>Location:</strong> {{ company.mineLocation }} <br>
        <strong>Description:</strong> {{ company.mineDescription }}
      </v-card-text>
    </v-card>
    <v-card>
      <div v-if="transformedItems.length === 0">
        <p>No data available.</p>
      </div>
      <div v-else>
        <v-table>
          <thead>
            <tr>
              <th v-for="header in headers" :key="header.value">
                {{ header.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in transformedItems" :key="item.mineralName">
              <td v-for="header in headers" :key="header.value">
                {{ item[header.value] }}
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-card>
    <div v-if="transformedItems.length === 0">
      <p>No data available.</p>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  requiresAuth: true
  </route>
