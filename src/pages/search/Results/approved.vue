<script setup lang="ts">
import { computed, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

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

// const sidestreamId = 'f1c45496-83ca-48fd-80c0-bb56dbc3a7b6' // Replace with the appropriate sidestreamId

const company = ref<Company | null>(null) // Initialize with null

const fetchCompanyData = async () => {
  try {
    const response = await axiosClient.get('/sidestream/requestor/21734667-7a32-45f4-97aa-accffc62066d/f1c45496-83ca-48fd-80c0-bb56dbc3a7b6') // Replace with actual params
    company.value = response.data
  }
  catch (error) {
    console.error(error)
  }
}

const router = useRouter()

fetchCompanyData()

const items = computed(() => {
  if (company.value) {
    return [
      {
        materialName: company.value.materialName,
        particleWeight: company.value.weight,
        particleSize: company.value.size,
        materialDescription: company.value.materialDescription,
        mineralName: company.value.mineralName,
        percentage: company.value.mineralPercentage,
        chemicalCode: company.value.mineralFormula,
      },
    ]
  }
  else {
    return [
      {
        materialName: 'No Data',
        particleWeight: 'No Data',
        particleSize: 'No Data',
        materialDescription: 'No Data',
        mineralName: 'No Data',
        percentage: 'No Data',
        chemicalCode: 'No Data',
      },
    ]
  }
})
</script>

<template>
  <div>
    <v-card v-if="company" class="mb-6">
      <v-card-title
        style="text-align:center; font-weight:bold; font-size: xx-large; margin-top: 20px;"
      >
        Results for {{ company.companyName }}
      </v-card-title>
      <v-card-text style="font-size: medium;">
        <strong>Mine Name:</strong> {{ company.mineName }} <br>
        <strong>Location:</strong> {{ company.mineLocation }} <br>
        <strong> Description: </strong> {{ company.mineDescription }}
      </v-card-text>
    </v-card>
    <v-card>
      <div>
        <v-table>
          <thead>
            <tr>
              <th v-for="header in headers" :key="header.value">
                {{ header.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ company?.materialName }}</td>
              <td>{{ company?.weight }}</td>
              <td>{{ company?.size }}</td>
              <td>{{ company?.materialDescription }}</td>
              <td>{{ company?.mineralName }}</td>
              <td>{{ company?.mineralFormula }}</td>
              <td>{{ company?.mineralPercentage }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-card>
    <div v-if="items.length === 0">
      <p>No data available.</p>
    </div>

    <WhiteButton
      button-name="Back"
      style="margin-top: 20px;"
      @click="router.back()"
    />
  </div>
</template>
