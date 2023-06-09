<script setup lang="ts">
const currentUser = useStorage(
  'user-store',
  localStorage,
)
const componentKey = ref(0)
const forceRerender = () => {
  if (currentUser && currentUser.id)
    componentKey.value += 1
}
</script>

<template>
  <v-navigation-drawer
    v-if="currentUser && currentUser.id"
    :key="componentKey"
    expand-on-hover
    rail
  >
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        :title="currentUser.id"
      />
    </v-list>
    <v-divider />
    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-home" title="Home" to="/" />
      <v-list-item prepend-icon="mdi-database-plus" title="Data insertion" to="/datainsertion" />
      <v-list-item prepend-icon="mdi-magnify" title="Search" to="/search/searchpage" />
      <v-list-item prepend-icon="mdi-share-variant" title="Data sharing" value="share" />
      <v-list-item prepend-icon="mdi-account-group" title="Customer" value="customer" />
      <v-divider />
      <v-list-item prepend-icon="mdi-face-agent" title="Support" value="support" />
      <v-divider />
      <v-list-item prepend-icon="mdi-logout" title="Logout" value="logout" />
    </v-list>
  </v-navigation-drawer>
</template>
