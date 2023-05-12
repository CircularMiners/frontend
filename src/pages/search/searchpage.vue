<script setup lang="ts">
import { searchBaseOnMaterialName } from '~/services/search.api.ts'
import type { companySideStreamData } from '~/interfaces/companySideStreamData.interface'
const searchTerm: String = ref('')
const noResultsText = ref('No results found for')
let filterResults: companySideStreamData[] = []
let isSearchClick = false

const componentKey = ref(0)
const forceRerender = () => {
  componentKey.value += 1
}
const search = () => {
  isSearchClick = !isSearchClick
  if (!searchTerm?.value.toLowerCase()) {
    return [] // return an empty object as the first value
  }
  else {
    searchBaseOnMaterialName(searchTerm?.value.toLowerCase())
      .then((res) => {
      // console.log("test", res);
        filterResults = res
        forceRerender()
      })
    // console.log(filterResults)
  }
}
</script>

<template>
  <div class="search-page">
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <h1
            style="text-align:center; font-weight:bold; font-size:xx-large;"
          >
            Mineral Search
          </h1>
          <h3 style="text-align:center; font-size: larger;">
            Search for materials and get access to full data and more
          </h3>
        </v-col>
        <v-row cols="22" sm="15" md="10" class="mt-5">
          <v-text-field
            v-model="searchTerm"
            placeholder="Search by material name"
            solo
            append-inner-icon="mdi-magnify"
            clearable
            height="10"
            @keydown.enter="search"
            @click:clear="filterResults.splice(0)"
          />
          <WhiteButton button-name="Search" class="ml-4" @click="search" />
        </v-row>
      </v-row>

      <!-- search results -->
      <v-row>
        <v-col cols="12">
          <p v-show="isSearchClick && searchTerm && filterResults.length === 0">
            {{ noResultsText }} "{{ searchTerm }}"
          </p>
          <SearchResults :key="componentKey" :search-term="searchTerm" :filtered-results="filterResults" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
