<script setup lang="ts">
import { ref } from 'vue'

const { mockData } = useCompanyMockDataStore()
const searchTerm = ref('')
const search = () => {
  // Do nothing since `filteredResults` is already being computed based on `searchTerm`.
}
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <h1 style="text-align:center; font-weight:bold; font-size:32px">
          Mineral Search
        </h1>
        <h3 style="text-align:center">
          Search for materials and get access to full data and more
        </h3>
      </v-col>
      <v-row cols="22" sm="15" md="10">
        <v-text-field
          v-model="searchTerm"
          placeholder="Search by mineral name"
          solo
          append-inner-icon="mdi-magnify"
          clearable
          height="10"
          @keydown.enter="search"
        />
        <WhiteButton button-name="Search" />
      </v-row>
    </v-row>

    <!-- search results -->
    <v-row>
      <v-col cols="12">
        <SearchResults :search-term="searchTerm" :mock-data="mockData" />
      </v-col>
    </v-row>
  </v-container>
</template>
