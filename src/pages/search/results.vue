<script>
export default {
  data() {
    return {
      company: null,
    };
  },
  created() {
    // Get the companyId from the route params
    const companyId = this.$route.params.companyId;

    // Find the company with the matching id from the mock data
    const fetchedData = mockData.find((company) => company.id === parseInt(companyId));

    // Update company with fetched data
    this.company = fetchedData;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<template>
  <v-container>
    <v-card v-if="company" class="mb-6">
      <v-card-title>
        {{ company.name }}
      </v-card-title>
      <v-card-text>
        {{ company.location }}
      </v-card-text>
    </v-card>
    <v-btn @click="goBack" class="mr-4">
      Back
    </v-btn>
  </v-container>
</template>
