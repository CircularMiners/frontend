<template>
  <div>
    <v-card v-for="(company, index) in filteredResults" :key="index" mb="6">
      <v-card-title>{{ company.companyName }}</v-card-title>
      <v-card-text>
        <p><b>Company Name:</b> {{ company.companyName }}</p>
        <p><b>Location:</b> {{ company.location }}</p>
        <p><b>Material:</b></p>
        <p><span style="padding-left: 6rem;">Material Name: {{ company.materialName }}</span><br />
        <span style="padding-left: 6rem;">Particle Size: {{ company.particleSize }}</span><br />
        <span style="padding-left: 6rem;">Particle Weight: {{ company.particleWeight }}</span></p>
        <p><b>Minerals:</b></p>
        <p><span style="padding-left: 6rem;">Mineral Name: {{ company.mineralName }}</span><br />
        <span style="padding-left: 6rem;">Percentage: {{ company.percentage }}</span><br />
        <span style="padding-left: 6rem;">Chemical Code: {{ company.chemicalCode }}</span><br />
        <span style="padding-left: 6rem;">Purity %: {{ company.purity }}</span><br />
        <span style="padding-left: 6rem;">Moisture %: {{ company.moisture }}</span></p>     
      </v-card-text>
      <v-layout justify-end align-start mb="3" mr="3">
        <v-btn :color="company.access ? 'green' : 'red'" @click="company.access ? openAccessPage(company.id) : showOverlayForm(company.id)">
  {{ company.access ? 'Open Access' : 'Request Access' }}
</v-btn>
      </v-layout>
    </v-card>
    <p v-if="searchTerm && filteredResults.length === 0">{{ noResultsText }} "{{ searchTerm }}"</p>
    <overlay-form v-if="showOverlayForm" @close-overlay="showOverlayForm = false"></overlay-form>
  </div>
</template>

<script>
import { computed } from 'vue';
import OverlayForm from './OverlayForm.vue';
import ResultsPage from '~/pages/search/results.vue';

export default {
  components: {
    OverlayForm,
    ResultsPage,
  },
  props: {
    mockData: {
      type: Array,
      required: true,
    },
    searchTerm: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      buttonText: 'Request Access',
      isButtonActive: false,
      noResultsText: 'No results found for',
      showOverlayForm: false,
    };
  },
  computed: {
    filteredResults() {
      return this.mockData.filter((data) => {
        return (
          data.companyName.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
          data.location.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      });
    },
  },
  methods: {
    openOverlayForm(companyId) {
      this.showOverlayForm = true;
      // this.$nextTick(() => {
      // this.$refs.overlayForm.setCompanyId(companyId);
    },
    openAccessPage(companyId) {
      this.$router.push({ name: 'ResultsPage', params: { companyId} });
    }
  },
};
</script>




