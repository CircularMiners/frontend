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
    <WhiteButton
      button-name="Export"
      style="margin-bottom: 20px;"
    />
    <v-card v-if="company" class="mb-6">
      <v-card-title
        style="text-align:center; font-weight:bold; font-size: xx-large; margin-top: 20px;"
      >
        Results for {{ company.companyName }}
      </v-card-title>
      <v-card-text style="font-size: medium;">
        Date of update: {{ company.date }} <br>
        Location: {{ company.location }}
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
