<script setup lang="ts">
const props = defineProps <{
  buttonName: string
}>()
</script>

<template>
  <v-btn
    class="text-none text-subtitle-1"
    color="cyan-darken-4"
    variant="outlined"
  >
    {{ props.buttonName }}
  </v-btn>
</template>
