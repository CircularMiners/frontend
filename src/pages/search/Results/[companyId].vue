<script setup lang="ts">
const props = defineProps<{ companyId: number }>()
const router = useRouter()
const { mockData } = useCompanyMockDataStore()

const company = computed(() => {
  return mockData.find(data => data.id === Number(props.companyId))
})
</script>

<template>
  <v-container>
    <v-card v-if="company" class="mb-6">
      <v-card-title>
        {{ company.companyName }}
      </v-card-title>
      <v-card-text>
        {{ company.location }}
      </v-card-text>
    </v-card>
    <v-btn class="mr-4" @click="router.back()">
      Back
    </v-btn>
  </v-container>
</template>
