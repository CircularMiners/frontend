<script setup lang="ts">
import axios from 'axios'
import { getMineList } from '~/services/mineSearch.api'
import type { CompositionMaterialForListing } from '~/interfaces/compositionMaterialForListing.interface'
import type { mineData } from '~/interfaces/mineData.interface'

const sideStreams = ref<CompositionMaterialForListing[]>([])
const mines = ref<mineData[]>([])
const componentKey = ref(0)
const userStore = useUserStore()
const selected = ref<mineData>()
const confirmDialogVisible = ref(false)
const confirmDialogId = ref('')

const forceRerender = () => {
  componentKey.value += 1
}

const axiosRequest = axios.create({
  baseURL: 'https://urchin-app-q36en.ondigitalocean.app/backend2/sidestream/',
})

const getSideStreamList = async (mineRepId: string, mineId: string) => {
  const getEndpoint = `/${mineRepId}/${mineId}`
  try {
    const response = await axiosRequest.get(getEndpoint)
    return response.data
  }
  catch (err) {
    console.error(err)
    return null
  }
}

const showConfirmationDialog = (sidestreamId: string) => {
  confirmDialogId.value = sidestreamId
  confirmDialogVisible.value = true
}

const deleted = async (sidestreamId: string) => {
  const deleteEndpoint = `/${userStore.user?.id}/${sidestreamId}`
  try {
    const response = await axiosRequest.delete(deleteEndpoint)
    return response.data
  }
  catch (err) {
    console.error(err)
    return null
  }
}

const deleteSideStream = async (sidestreamId: string) => {
  confirmDialogVisible.value = false

  try {
    const response = await deleted(sidestreamId)
    // Handle successful deletion
    if (response) {
      // Remove the deleted sidestream from the list
      sideStreams.value = sideStreams.value.filter(s => s.id !== sidestreamId)
      forceRerender()
    }
  }
  catch (err) {
    console.error(err)
    // Handle deletion error
  }
}

const selectedMine = async () => {
  const res = await getSideStreamList(userStore.user?.id, selected.value?.mine_id)
  if (res) {
    sideStreams.value = res
    forceRerender()
  }
}

const searchMine = () => {
  getMineList()
    .then((res) => {
      mines.value = res
      forceRerender()
    })
}

onMounted(() => {
  searchMine()
})
</script>

<template>
  <v-select
    v-model="selected"
    :items="mines"
    item-title="mine_name"
    item-value="mine_id"
    label="Select a Mine"
    outlined
    return-object
    @update:model-value="selectedMine"
  />
  <h1>Mine Sidestreams</h1>
  <h2 v-if="sideStreams.length === 0">
    No sidestreams found
  </h2>
  <v-card v-for="sidestream in sideStreams" :key="sidestream.id" outlined mt-4>
    <v-card-title>
      <span class="headline">{{ sidestream.oreName }}</span>
    </v-card-title>
    <v-card-text>
      <div>Weight: {{ sidestream.weight }}</div>
      <div>Size: {{ sidestream.size }}</div>
      <div>Description: {{ sidestream.SidestreamDescription }}</div>
      <div v-if="sidestream.mineralName">
        Mineral Name: {{ sidestream.mineralName }}
      </div>
      <div v-if="sidestream.mineralFormula">
        Mineral Formula: {{ sidestream.mineralFormula }}
      </div>
      <div v-if="sidestream.mineralPercentage">
        Mineral Percentage: {{ sidestream.mineralPercentage }}
      </div>
    </v-card-text>
    <v-btn class="delete-button" @click="showConfirmationDialog(sidestream.id)">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </v-card>
  <v-dialog v-model="confirmDialogVisible" max-width="400">
    <v-card>
      <v-card-title>Delete Sidestream</v-card-title>
      <v-card-text>Are you sure you want to delete this sidestream?</v-card-text>
      <v-card-actions>
        <v-btn text @click="confirmDialogVisible = false">
          Cancel
        </v-btn>
        <v-btn color="error" text @click="deleteSideStream(confirmDialogId)">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
.delete-button {
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>
