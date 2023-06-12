<script setup lang="ts">
import { getMineList } from '~/services/mineSearch.api'
import { getMineralList } from '~/services/mineralSearch.api'
import { createSideStreamData } from '~/services/createSideStreamData.api'
import type { CompositionMaterial } from '~/interfaces/compositionMaterial.interface'
import type { mineData } from '~/interfaces/mineData.interface'
const userStore = useUserStore()

interface mineSideStreamFormData {
  oreName: string
  description: string
  weight: number | null
  size: number | null
  compositionMaterial: CompositionMaterial[]
}

const selectedMine = ref('')

const selectedMineral = ref<CompositionMaterial>({
  mineralFormula: '',
  mineralPercentage: 0,
})

const formData = ref<mineSideStreamFormData>({
  oreName: '',
  description: '',
  weight: null,
  size: null,
  compositionMaterial: [],
})

const addMaterial = () => {
  formData.value.compositionMaterial.push({
    mineralFormula: selectedMineral.value.mineralFormula,
    mineralPercentage: 0,
  })
}

const submitForm = () => {
  createSideStreamData(
    formData.value,
    userStore.user?.id,
    selectedMine.value,
  )
    .then(() => {
      formData.value = {
        oreName: '',
        description: '',
        weight: null,
        size: null,
        compositionMaterial: [],
      }
    })
}

const mines = ref<mineData[]>([])
const minerals = ref<CompositionMaterial[]>([])

const componentKey = ref(0)

const forceRerender = () => {
  componentKey.value += 1
}

const searchMine = () => {
  getMineList()
    .then((res) => {
      mines.value = res
      forceRerender()
    })
}

const searchMineral = () => {
  getMineralList()
    .then((res) => {
      minerals.value = res
      forceRerender()
    })
}

onMounted(() => {
  searchMine()
  searchMineral()
})
</script>

<template>
  <v-select
    v-model="selectedMine"
    :items="mines"
    item-title="mine_name"
    item-value="mine_id"
    label="Select a Mine"
    outlined
  />
  <v-form @submit.prevent="submitForm">
    <v-text-field v-model="formData.oreName" label="Ore Name" required />
    <v-text-field v-model="formData.description" label="Description" required />
    <v-text-field v-model="formData.weight" type="number" label="Weight" required />
    <v-text-field v-model="formData.size" type="number" label="Size" required />

    <v-card v-for="(material, index) in formData.compositionMaterial" :key="index" class="mb-4">
      <v-card-title class="headline">
        Composition Material {{ index + 1 }}
      </v-card-title>
      <v-select
        v-model="material.mineralFormula"
        :items="minerals"
        item-title="mineral_name"
        item-value="mineral_chemical_formula"
        label="Select a Mineral"
        outlined
      />
      <v-text-field v-model="material.mineralPercentage" type="number" label="Mineral Percentage" required />
    </v-card>

    <v-btn color="primary" @click="addMaterial">
      Add Another Mineral
    </v-btn>

    <v-btn ml-2 type="submit" color="primary">
      Submit
    </v-btn>
  </v-form>
</template>

<route lang="yaml">
meta:
  requiresAuth: true
</route>
