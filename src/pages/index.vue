<script setup lang="ts">
const userStore = useUserStore()
const userType = computed(() => localStorage.getItem('user-type'))
</script>

<template>
  <div class="home">
    <div class="text-center">
      <h1>Welcome to Mine Match! User: {{ userStore.user?.id }}</h1>
      <br>
      <h2>Please select a page from the navigation drawer.</h2>
      <br>
      --------------------------
      <p>Or choose from the following:</p>
      <br>
      <div v-if="userType === 'representative'">
        <h3>Register a new mine</h3>
        <v-btn to="/MineRegister" ma-10>
          Mine Registration
        </v-btn>
        <br>
        <h3>Insert data as mine side streams for mines you represent</h3>
        <v-btn to="/datainsertion" ma-10>
          Data insertion
        </v-btn>
        <br>
        <h3>View or delete the side streams for mines you represent</h3>
        <v-btn to="/sidestreamlist" ma-10>
          Side Stream Listing
        </v-btn>
        <br>
        <h3>View pending and history of data sharing requests for mines you represent</h3>
        <v-btn to="/requestors" ma-10>
          Data sharing
        </v-btn>
      </div>

      <div v-if="userType === 'requestor'">
        <h3>Search for side stream data by a mine or material and request for data sharing(for closed data)</h3>
        <v-btn to="/search/searchpage" ma-10>
          Search
        </v-btn>
        <br>
        <h3>View data and requests the history of the data that you had requested</h3>
        <v-btn to="/search/history/history" ma-10>
          Data sharing
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Set the height of the container to full viewport height */
}
</style>

<route lang="yaml">
meta:
  requiresAuth: true
</route>
