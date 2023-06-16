<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'

const props = defineProps<{ sidestreamId: string }>()
const userStore = useUserStore()
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
  sideStreamId: string
  materialName: string
  weight: string
  size: string
  materialDescription: string
  mineralName: string
  mineralFormula: string
  mineralPercentage: string
}

const companies = ref<Company[]>([]) // Initialize as an empty array

const fetchData = async () => {
  const response = await axiosClient.get(`/sidestream/requestor/${userStore?.user?.id}/${props.sidestreamId}`)
  companies.value = response.data
}

onMounted(fetchData)

const transformedItems = computed(() => {
  return companies.value.map((company) => {
    const transformedItem: any = {}
    for (const header of headers)
      transformedItem[header.value] = company[header.value] || 'No Data'

    return transformedItem
  })
})
</script>

<template>
  <div>
    <v-card v-if="companies.length > 0" class="mb-6">
      <v-card-title style="text-align:center; font-weight:bold; font-size: xx-large; margin-top: 20px;">
        Results for {{ companies[0].companyName }}
      </v-card-title>
      <v-card-text style="font-size: medium;">
        <strong>Mine Name:</strong> {{ companies[0].mineName }} <br>
        <strong>Location:</strong> {{ companies[0].mineLocation }} <br>
        <strong>Description:</strong> {{ companies[0].mineDescription }}
      </v-card-text>
    </v-card>
    <v-card v-if="transformedItems.length > 0">
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
    </v-card>
    <div v-else>
      <p>No data available.</p>
    </div>
  </div>
</template>
