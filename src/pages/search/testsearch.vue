<script>
import mockData from './data.json'

export default {
  data() {
    return {
      searchTerm: '',
      mockData: [],
    }
  },
  mounted() {
    this.mockData = mockData
  },
  methods: {
    search() {
      // search logic here
    },
  },
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
      <v-col cols="22" sm="15" md="10">
        <v-text-field
          v-model="searchTerm"
          placeholder="Search by mineral name"
          solo
          append-icon="mdi-magnify"
          clearable
          height="10"
          @keydown.enter="search"
        >
          <template #append>
            <WhiteButton button-name="Search" />
          </template>
        </v-text-field>
      </v-col>
    </v-row>

    <!-- search results -->
    <v-row>
      <v-col cols="12">
        <SearchResults :search-results="filteredResults" :search-term="searchTerm" :mock-data="mockData" />
      </v-col>
    </v-row>
  </v-container>
</template>
