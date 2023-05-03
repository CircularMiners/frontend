<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <h1 style="text-align:center; font-weight:bold; font-size:32px">Mineral Search</h1>
          <h3 style="text-align:center">Search for materials and get access to full data and more</h3>
        </v-col>
        <v-col cols="22" sm="15" md="10">
          <v-text-field
            v-model="searchTerm"
            placeholder="Search by mineral name"
            solo
            append-icon="mdi-magnify"
            clearable
            @keydown.enter="search"
            height="10"
          >
            <template #append>
                <WhiteButton buttonName="Search"/>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
  
      <!-- search results -->
      <v-row>
        <v-col cols="12">
          <SearchResults :searchResults="filteredResults" :searchTerm="searchTerm" :mockData="mockData" />
        </v-col>
      </v-row>
    </v-container>
  </template>

<script>
  import mockData from './data.json';

  export default {
    data() {
      return {
        searchTerm: '',
        mockData: []
      }
    },
    mounted() {
      this.mockData = mockData;
    },
    methods: {
      search() {
        // search logic here
      }
    }
  }
</script>