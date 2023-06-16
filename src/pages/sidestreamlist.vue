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
      // Find the group and sidestream to be deleted
      let groupIndex = -1
      let sidestreamIndex = -1

      Object.keys(sideStreams.value).forEach((groupId) => {
        const group = sideStreams.value[groupId]
        const index = group.findIndex(s => s.id === sidestreamId)
        if (index !== -1) {
          groupIndex = groupId
          sidestreamIndex = index
        }
      })

      // Remove the deleted sidestream from the group
      if (groupIndex !== -1 && sidestreamIndex !== -1)
        sideStreams.value[groupIndex].splice(sidestreamIndex, 1)

      // If the group becomes empty, remove it from sideStreams
      if (sideStreams.value[groupIndex].length === 0)
        delete sideStreams.value[groupIndex]

      forceRerender()
    }
  }
  catch (err) {
    console.error(err)
    // Handle deletion error
  }
}

const groupSidestreamsById = (sidestreams: CompositionMaterialForListing[]) => {
  const groupedSidestreams: Record<string, CompositionMaterialForListing[]> = {}

  sidestreams.forEach((sidestream) => {
    // eslint-disable-next-line no-prototype-builtins
    if (groupedSidestreams.hasOwnProperty(sidestream.id))
      groupedSidestreams[sidestream.id].push(sidestream)

    else
      groupedSidestreams[sidestream.id] = [sidestream]
  })

  return groupedSidestreams
}

const selectedMine = async () => {
  const res = await getSideStreamList(userStore.user?.id, selected.value?.mine_id)
  if (res) {
    sideStreams.value = groupSidestreamsById(res)
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
  <h2 v-if="Object.keys(sideStreams).length === 0">
    No sidestreams found
  </h2>
  <v-card v-for="(sidestreams, id) in sideStreams" :key="id" outlined mt-4>
    <v-btn class="delete-button" @click="showConfirmationDialog(sidestreams[0].id)">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
    <v-card-title>
      <span class="headline">{{ sidestreams[0].oreName }}</span>
    </v-card-title>
    <v-card-text>
      <div>
        <div>Weight: {{ sidestreams[0].weight }}</div>
        <div>Size: {{ sidestreams[0].size }}</div>
        <div>Description: {{ sidestreams[0].SidestreamDescription }}</div>
      </div>
      <hr>
      <div v-for="sidestream in sidestreams" :key="sidestream.id">
        <div v-if="sidestream.mineralName">
          Mineral Name: {{ sidestream.mineralName }}
        </div>
        <div v-if="sidestream.mineralFormula">
          Mineral Formula: {{ sidestream.mineralFormula }}
        </div>
        <div v-if="sidestream.mineralPercentage">
          Mineral Percentage: {{ sidestream.mineralPercentage }}
        </div>
        <br>
      </div>
    </v-card-text>
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
