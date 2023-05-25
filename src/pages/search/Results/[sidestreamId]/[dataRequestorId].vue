<script setup lang="ts">
import { computed, ref } from 'vue'
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

const route = useRoute()
const _sidestreamId = ref(route.params.sidestreamId as string)
const _dataRequestorId = ref(route.params.dataRequestorId as string)

const fetchCompanyData = async () => {
  const url = `/sidestream/requestor/449cb02f-df1d-4982-87ea-2230815b75f1/${_sidestreamId.value}`
  const response = await axiosClient.get(url)
  company.value = response.data
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
