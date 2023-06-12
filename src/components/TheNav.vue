<script setup lang="ts">
import { useResetStore } from '~/utils/useResetStore'
const router = useRouter()
const userStore = useUserStore()
const userType = computed(() => localStorage.getItem('user-type'))

const resetStore = useResetStore()

const logout = () => {
  resetStore.user()
  localStorage.removeItem('user-type')
  router.push('/login')
}
</script>

<template>
  <v-navigation-drawer
    v-if="userStore.user?.id"
    expand-on-hover
    rail
  >
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        :title="userStore.user?.id"
      />
    </v-list>
    <v-divider />
    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-home" title="Home" to="/" />
      <v-list-item v-if="userType === 'representative'" prepend-icon="mdi-minecraft" title="Mine Registration" to="/MineRegister" />
      <v-list-item v-if="userType === 'representative'" prepend-icon="mdi-database-plus" title="Data insertion" to="/datainsertion" />
      <v-list-item v-if="userType === 'representative'" prepend-icon="mdi-share-variant" title="Data sharing" to="/requestors" />
      <v-list-item v-if="userType === 'requestor'" prepend-icon="mdi-magnify" title="Search" to="/search/searchpage" />
      <v-list-item v-if="userType === 'requestor'" prepend-icon="mdi-share-variant" title="Data sharing" to="/search/History/history" />
      <!-- <v-list-item prepend-icon="mdi-account-group" title="Customer" value="customer" />
      <v-divider />
      <v-list-item prepend-icon="mdi-face-agent" title="Support" value="support" /> -->
      <v-divider />
      <v-list-item prepend-icon="mdi-logout" title="Logout" value="logout" @click="logout" />
    </v-list>
  </v-navigation-drawer>
</template>
