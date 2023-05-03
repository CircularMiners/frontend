<!--
<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <h1 style="text-align:center; font-weight:bold; font-size:32px">Mineral Search</h1>
          <h3 style="text-align:center">Search for materials and get access to full data and more</h3>
        </v-col>
        <v-col cols="22" sm="15" md="10">
          <v-text-field
            v-model="companyName"
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

      search results -->
<!--
      <v-row>
        <v-col cols="12">
            <SearchResults :searchResults="searchResults" />
        </v-col>
      </v-row>

    </v-container>
  </template>

<script setup lang="ts">
// import searchresults component from the components folder
import SearchResults from '~/components/SearchResults.vue';
import { ref } from 'vue';

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
}

const searchResults = ref<Company[]>([]);
// const searchTerm = ref('');
const companyName = ref('');
// const location = ref('');

// const search = () => {
//   // In a real app, this function would handle the search logic
//   // For demo purposes, we'll just hardcode some mock data
//   searchResults.value = [
//     {
//       id: 1,
//       companyName: 'ABC Company',
//       location: 'Helsinki',
//       materialName: 'Quartz',
//       particleSize: '10mm',
//       particleWeight: '100g',
//       mineralName: 'Silicon',
//       percentage: '75%',
//       chemicalCode: 'SiO2',
//       purity: '90%',
//       moisture: '5%',
//     },
//     {
//       id: 2,
//       companyName: 'XYZ Company',
//       location: 'Turku',
//       materialName: 'Feldspar',
//       particleSize: '20mm',
//       particleWeight: '200g',
//       mineralName: 'Aluminum silicate',
//       percentage: '60%',
//       chemicalCode: 'Al2SiO4',
//       purity: '85%',
//       moisture: '7%',
//     },
//     {
//       id: 3,
//       companyName: 'DEF Company',
//       location: 'Tampere',
//       materialName: 'Mica',
//       particleSize: '5mm',
//       particleWeight: '50g',
//       mineralName: 'Potassium aluminum silicate',
//       percentage: '80%',
//       chemicalCode: 'KAl2(AlSi3O10)(OH)2',
//       purity: '95%',
//       moisture: '3%',
//     },
//   ];
// };

const search = () => {
  // In a real app, this function would handle the search logic
  // For demo purposes, we'll just hardcode some mock data
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
    },
  ];

  const results = mockData.filter((data) => {
    return (
      data.companyName.toLowerCase().includes(searchResults.value.toLowerCase()) &&
      data.location.toLowerCase().includes(searchResults.value.toLowerCase())
    );
  });
  searchResults.value = results;
};

</script>

 -->
 <!-- <template>

    <v-card
      color="blue-grey darken-1"
      dark
      :loading="isUpdating"
    >
      <template v-slot:progress>
        <v-progress-linear
          absolute
          color="green lighten-3"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-img
        height="200"
        src="https://cdn.vuetifyjs.com/images/cards/dark-beach.jpg"
      >
        <v-row>
          <v-col
            class="text-right"
            cols="12"
          >
            <v-menu
              bottom
              left
              transition="slide-y-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="isUpdating = true">
                  <v-list-item-action>
                    <v-icon>mdi-cog</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Update</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <v-row
            class="pa-4"
            align="center"
            justify="center"
          >
            <v-col class="text-center">
              <h3 class="text-h5">
                {{ name }}
              </h3>
              <span class="grey--text text--lighten-1">{{ title }}</span>
            </v-col>
          </v-row>
        </v-row>
      </v-img>
      <v-form>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="name"
                :disabled="isUpdating"
                filled
                color="blue-grey lighten-2"
                label="Name"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="title"
                :disabled="isUpdating"
                filled
                color="blue-grey lighten-2"
                label="Title"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                v-model="friends"
                :disabled="isUpdating"
                :items="people"
                filled
                chips
                color="blue-grey lighten-2"
                label="Select"
                item-text="name"
                item-value="name"
                multiple
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                    @click:close="remove(data.item)"
                  >
                    <v-avatar left>
                      <v-img :src="data.item.avatar"></v-img>
                    </v-avatar>
                    {{ data.item.name }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content v-text="data.item"></v-list-item-content>
                  </template>
                  <template v-else>
                    <v-list-item-avatar>
                      <img :src="data.item.avatar">
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-html="data.item.name"></v-list-item-title>
                      <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-switch
          v-model="autoUpdate"
          :disabled="isUpdating"
          class="mt-0"
          color="green lighten-2"
          hide-details
          label="Auto Update"
        ></v-switch>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="autoUpdate"
          :loading="isUpdating"
          color="blue-grey darken-3"
          depressed
          @click="isUpdating = true"
        >
          <v-icon left>
            mdi-update
          </v-icon>
          Update Now
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>

<script>
export default {
  data () {
    const srcs = {
      1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
      4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
      5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
    }

    return {
      autoUpdate: true,
      friends: ['Sandra Adams', 'Britta Holt'],
      isUpdating: false,
      name: 'Midnight Crew',
      people: [
        { header: 'Group 1' },
        { name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1] },
        { name: 'Ali Connors', group: 'Group 1', avatar: srcs[2] },
        { name: 'Trevor Hansen', group: 'Group 1', avatar: srcs[3] },
        { name: 'Tucker Smith', group: 'Group 1', avatar: srcs[2] },
        { divider: true },
        { header: 'Group 2' },
        { name: 'Britta Holt', group: 'Group 2', avatar: srcs[4] },
        { name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5] },
        { name: 'John Smith', group: 'Group 2', avatar: srcs[1] },
        { name: 'Sandra Williams', group: 'Group 2', avatar: srcs[3] },
      ],
      title: 'The summer breeze',
    }
  },

  watch: {
    isUpdating (val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000)
      }
    },
  },

  methods: {
    remove (item) {
      const index = this.friends.indexOf(item.name)
      if (index >= 0) this.friends.splice(index, 1)
    },
  },
}
</script> -->

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
