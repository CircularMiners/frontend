<script setup lang="ts">
const { mockData } = useCompanyMockDataStore()
const searchTerm = ref('')
const searchButtonStatus = ref(false)
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
            @keydown.enter="searchButtonStatus"
          />
          <WhiteButton button-name="Search" class="ml-4" @click="searchButtonStatus = !searchButtonStatus" />
        </v-row>
      </v-row>

      <!-- search results -->
      <v-row>
        <v-col cols="12">
          <SearchResults :search-button-status="searchButtonStatus" :search-term="searchTerm" :mock-data="mockData" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
