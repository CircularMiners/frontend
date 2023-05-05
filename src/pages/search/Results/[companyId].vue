<script setup lang="ts">
const props = defineProps<{ companyId: number }>()
const router = useRouter()
const { mockData } = useCompanyMockDataStore()

const company = computed(() => {
  return mockData.find((data: { id: number }) => data.id === Number(props.companyId))
})

const headers = [
  { label: 'Material Name', value: 'materialName' },
  { label: 'Particle Size', value: 'particleSize' },
  { label: 'Particle Weight', value: 'particleWeight' },
  { label: 'Mineral Name', value: 'mineralName' },
  { label: 'Percentage', value: 'percentage' },
  { label: 'Chemical Code', value: 'chemicalCode' },
  { label: 'Purity', value: 'purity' },
  { label: 'Moisture', value: 'moisture' },
]

const items = computed(() => {
  if (company.value) {
    return [
      {
        materialName: company.value.materialName,
        particleSize: company.value.particleSize,
        particleWeight: company.value.particleWeight,
        mineralName: company.value.mineralName,
        percentage: company.value.percentage,
        chemicalCode: company.value.chemicalCode,
        purity: company.value.purity,
        moisture: company.value.moisture,
      },
    ]
  }
  else {
    return [
      {
        materialName: 'No Data',
        particleSize: 'No Data',
        particleWeight: 'No Data',
        mineralName: 'No Data',
        percentage: 'No Data',
        chemicalCode: 'No Data',
        purity: 'No Data',
        moisture: 'No Data',
      },
    ]
  }
})
</script>

<template>
  <div>
    <v-card v-if="company" class="mb-6">
      <v-card-title>
        {{ company.companyName }}
      </v-card-title>
      <v-card-text>
        {{ company.location }}
      </v-card-text>
      <v-card-text>
        {{ company.particleWeight }}
      </v-card-text>
    </v-card>
    <div>
      <p>Vuetify table:</p>
      <v-data-table
        :headers="headers"
        :items="items"
        item-key="particleSize"
        class="elevation-1"
        dense
      />
    </div>
    <div v-if="items.length === 0">
      <p>No data available.</p>
    </div>

    <div v-else>
      <p>TS table:</p>
      <table class="table">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header.value">
              {{ header.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>{{ item.materialName }}</td>
            <td>{{ item.particleSize }}</td>
            <td>{{ item.particleWeight }}</td>
            <td>{{ item.mineralName }}</td>
            <td>{{ item.percentage }}</td>
            <td>{{ item.chemicalCode }}</td>
            <td>{{ item.purity }}</td>
            <td>{{ item.moisture }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <v-btn class="mr-4" @click="router.back()">
      Back
    </v-btn>
  </div>
</template>
