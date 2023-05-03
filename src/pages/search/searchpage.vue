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
          height="10"
          @keydown.enter="search"
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

<script setup lang="ts">
import SearchResults from '~/components/SearchResults.vue';
import { ref, computed } from 'vue';

interface Company {
  id: number;
  companyName: string;
  location: string;
  materialName: string;
  particleSize: string;
  particleWeight: string;
  mineralName: string;
  percentage: string;
  chemicalCode: string;
  purity: string;
  moisture: string;
  access: boolean;
}

const mockData: Company[] = [
  {
    id: 1,
    companyName: 'ABC Company',
    location: 'Helsinki',
    materialName: 'Quartz',
    particleSize: '10mm',
    particleWeight: '100g',
    mineralName: 'Silicon',
    percentage: '75%',
    chemicalCode: 'SiO2',
    purity: '90%',
    moisture: '5%',
    access: true,
  },
  {
    id: 2,
    companyName: 'XYZ Company',
    location: 'Turku',
    materialName: 'Feldspar',
    particleSize: '20mm',
    particleWeight: '200g',
    mineralName: 'Aluminum silicate',
    percentage: '60%',
    chemicalCode: 'Al2SiO4',
    purity: '85%',
    moisture: '7%',
    access: false,
  },
  {
    id: 3,
    companyName: 'DEF Company',
    location: 'Tampere',
    materialName: 'Mica',
    particleSize: '5mm',
    particleWeight: '50g',
    mineralName: 'Potassium aluminum silicate',
    percentage: '80%',
    chemicalCode: 'KAl2(AlSi3O10)(OH)2',
    purity: '95%',
    moisture: '3%',
    access: true,
  },
];


const searchTerm = ref('');
const filteredResults = computed(() => {
  if (searchTerm.value === '') {
    return [];
  }
  return mockData.filter((data) => {
    return (
      data.materialName.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      data.mineralName.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  });
});

const search = () => {
  // Do nothing since `filteredResults` is already being computed based on `searchTerm`.
};

</script>
